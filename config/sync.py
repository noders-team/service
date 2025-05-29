#!/usr/bin/python3

import asyncio
import aiohttp
import json
import re
import random
import sys
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple
from jinja2 import Environment, FileSystemLoader
from collections import defaultdict


class SyncError(Exception):
    pass


class BlockchainSyncer:
    def __init__(self, config_dir: str = ".", docs_dir: str = "../docs"):
        self.config_dir = Path(config_dir)
        self.docs_dir = Path(docs_dir)
        self.templates_dir = self.config_dir / "templates"
        
        # Statistics tracking
        self.stats = {
            'processed': 0, 'failed': 0, 'auto_enrichment_fails': defaultdict(list),
            'template_fails': [], 'total_auto_fields': 0, 'resolved_auto_fields': 0, 
            'chain_failures': defaultdict(list)
        }
        
        # Jinja2 environment
        self.jinja_env = Environment(
            loader=FileSystemLoader([
                str(self.templates_dir / "mainnet"), 
                str(self.templates_dir / "testnet")
            ]),
            trim_blocks=True, lstrip_blocks=True
        )

    def _log(self, msg: str, level: str = "INFO", chain: str = None):
        icons = {"ERROR": "❌", "WARNING": "⚠️", "INFO": "ℹ️", "SUCCESS": "✅"}
        prefix = f"[{chain}] " if chain else ""
        print(f"{icons.get(level, '')} {level}: {prefix}{msg}")

    def _read_config(self, config_path: Path) -> Dict[str, Any]:
        """Read and parse configuration file"""
        if not config_path.exists():
            raise SyncError(f"Config file {config_path} not found")
        
        config = {}
        try:
            with open(config_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        config[key] = value.strip('"\'')
        except Exception as e:
            raise SyncError(f"Failed to read {config_path}: {e}")
        return config

    def _validate_config(self, config_path: Path) -> Tuple[Dict[str, Any], List[str]]:
        """Validate configuration file"""
        config, errors = {}, []
        
        if not config_path.exists():
            return config, [f"Config file not found: {config_path}"]
        
        try:
            config = self._read_config(config_path)
        except Exception as e:
            return config, [str(e)]
        
        # Check required fields
        required = ['CHAIN_NAME', 'CHAIN_SYSTEM_NAME']
        missing = [f for f in required if not config.get(f)]
        if missing:
            errors.append(f"Missing required fields: {missing}")
        
        if config.get('CHAIN_NAME') == 'Unknown':
            errors.append("CHAIN_NAME is set to 'Unknown'")
        
        chain_sys = config.get('CHAIN_SYSTEM_NAME', '')
        if chain_sys and not re.match(r'^[a-z0-9_-]+$', chain_sys):
            errors.append(f"CHAIN_SYSTEM_NAME '{chain_sys}' has invalid characters")
        
        return config, errors

    def run_pre_check(self) -> bool:
        """Run comprehensive pre-check validation"""
        print("🔍 PRE-CHECK VALIDATION")
        print("=" * 50)
        
        errors = []
        
        # Check directories
        for scope in ['mainnet-networks', 'testnet-networks']:
            dir_path = self.config_dir / scope
            if not dir_path.exists() or not any(dir_path.glob("*")):
                errors.append(f"Directory missing/empty: {dir_path}")
        
        # Check templates
        required_templates = [
            'main.mdx.j2', '_category_.json.j2', 'install.mdx.j2', 'upgrade.mdx.j2', 
            'snapshot.mdx.j2', 'statesync.mdx.j2', 'seeds-and-peers.mdx.j2', 
            'cli-cheatsheet.mdx.j2', 'endpoints.mdx.j2', 'monitoring.mdx.j2'
        ]
        
        for scope in ['mainnet', 'testnet']:
            scope_dir = self.templates_dir / scope
            if not scope_dir.exists():
                errors.append(f"Template directory missing: {scope_dir}")
                continue
            
            for template in required_templates:
                template_path = scope_dir / template
                if not template_path.exists():
                    errors.append(f"Missing template: {template}")
                else:
                    try:
                        self.jinja_env.get_template(template)
                    except Exception as e:
                        errors.append(f"Invalid template {template}: {e}")
        
        # Check config files
        config_count = config_errors = 0
        for scope in ['mainnet-networks', 'testnet-networks']:
            scope_dir = self.config_dir / scope
            if scope_dir.exists():
                for config_file in scope_dir.glob("*"):
                    if config_file.is_file() and not config_file.name.startswith('.'):
                        config_count += 1
                        config, file_errors = self._validate_config(config_file)
                        if file_errors:
                            config_errors += 1
                            errors.extend([f"[{config_file.stem}] {e}" for e in file_errors])
        
        # Check output directory
        try:
            self.docs_dir.mkdir(parents=True, exist_ok=True)
            (self.docs_dir / ".test_write").write_text("test")
            (self.docs_dir / ".test_write").unlink()
        except Exception as e:
            errors.append(f"Cannot write to output directory {self.docs_dir}: {e}")
        
        print(f"📊 Config files: {config_count} checked, {config_errors} with errors")
        
        if errors:
            print(f"\n❌ ERRORS ({len(errors)}):")
            for error in errors:
                print(f"  • {error}")
            print("\n💥 PRE-CHECK FAILED")
            return False
        else:
            print("✅ PRE-CHECK PASSED!")
            return True

    async def _fetch_json(self, session: aiohttp.ClientSession, url: str, robust: bool = False) -> Optional[Dict[str, Any]]:
        """Fetch JSON data with optional robust retry logic"""
        retries = 3 if robust else 2
        base_timeout = 10 if robust else 8
        
        for attempt in range(retries + 1):
            try:
                timeout = base_timeout + (attempt * (5 if robust else 2))
                async with session.get(url, timeout=timeout) as response:
                    if response.status == 200:
                        data = await response.json()
                        if isinstance(data, dict) and data:
                            return data
                    elif robust and response.status in (502, 503, 504) and attempt < retries:
                        await asyncio.sleep(1 * (attempt + 1))
                        continue
                    return None
            except (asyncio.TimeoutError, Exception):
                if attempt < retries:
                    await asyncio.sleep((0.5 if not robust else 1) * (attempt + 1))
                    continue
                return None
        return None

    async def _fetch_text(self, session: aiohttp.ClientSession, url: str) -> Optional[str]:
        """Fetch text content"""
        try:
            async with session.get(url, timeout=10) as response:
                return await response.text() if response.status == 200 else None
        except Exception:
            return None

    async def _fetch_headers(self, session: aiohttp.ClientSession, url: str) -> Optional[Dict[str, str]]:
        """Fetch HTTP headers"""
        try:
            async with session.head(url, timeout=8) as response:
                return dict(response.headers) if response.status == 200 else None
        except Exception:
            return None

    async def _auto_enrich_field(self, session: aiohttp.ClientSession, enriched: Dict[str, Any], field: str, chain_name: str) -> bool:
        """Auto-enrich a single field using API calls"""
        if enriched.get(field) != 'auto':
            return True
            
        success = False
        rpc_endpoint = enriched.get('endpoint_rpc')
        api_endpoint = enriched.get('endpoint_api')
        
        if field == 'chain_id':
            # Try RPC /status first
            if rpc_endpoint:
                data = await self._fetch_json(session, f"{rpc_endpoint}/status", robust=True)
                if data:
                    chain_id = data.get('result', {}).get('node_info', {}).get('network')
                    if chain_id and str(chain_id).strip() != 'auto':
                        enriched['chain_id'] = str(chain_id).strip()
                        success = True
            
            # Fallback to API
            if not success and api_endpoint:
                data = await self._fetch_json(session, f"{api_endpoint}/cosmos/base/tendermint/v1beta1/node_info", robust=True)
                if data:
                    chain_id = data.get('default_node_info', {}).get('network')
                    if chain_id and str(chain_id).strip() != 'auto':
                        enriched['chain_id'] = str(chain_id).strip()
                        success = True
        
        elif field == 'endpoint_peer':
            # Try RPC /status first
            if rpc_endpoint:
                data = await self._fetch_json(session, f"{rpc_endpoint}/status", robust=True)
                if data:
                    node_info = data.get('result', {}).get('node_info', {})
                    peer_id = node_info.get('id')
                    listen_addr = node_info.get('listen_addr', '')
                    
                    if peer_id:
                        peer_address = rpc_endpoint.replace('https://', '')
                        peer_port = listen_addr.split(':')[-1] if ':' in listen_addr else listen_addr
                        enriched['endpoint_peer'] = f"{peer_id}@{peer_address}:{peer_port}"
                        success = True
            
            # Fallback to API
            if not success and api_endpoint:
                data = await self._fetch_json(session, f"{api_endpoint}/cosmos/base/tendermint/v1beta1/node_info", robust=True)
                if data:
                    node_info = data.get('default_node_info', {})
                    peer_id = node_info.get('default_node_id')
                    listen_addr = node_info.get('listen_addr', '')
                    
                    if peer_id and rpc_endpoint:
                        peer_address = rpc_endpoint.replace('https://', '')
                        peer_port = listen_addr.split(':')[-1] if ':' in listen_addr else listen_addr
                        enriched['endpoint_peer'] = f"{peer_id}@{peer_address}:{peer_port}"
                        success = True
        
        elif field == 'version':
            # Try abci_info first
            if rpc_endpoint:
                data = await self._fetch_json(session, f"{rpc_endpoint}/abci_info?", robust=True)
                if data:
                    version = data.get('result', {}).get('response', {}).get('version')
                    if version and str(version).strip() not in ('null', 'auto'):
                        version = str(version).strip().strip('"')
                        if not version.startswith('v') and re.match(r'^[0-9]+(\.[0-9]+)*', version):
                            version = f"v{version}"
                        enriched['version'] = version
                        success = True
            
            # Fallback to API application_version
            if not success and api_endpoint:
                data = await self._fetch_json(session, f"{api_endpoint}/cosmos/base/tendermint/v1beta1/node_info", robust=True)
                if data:
                    app_version = data.get('application_version', {}).get('version')
                    if app_version and str(app_version).strip() not in ('null', 'auto'):
                        version = str(app_version).strip().strip('"')
                        if not version.startswith('v') and re.match(r'^[0-9]+(\.[0-9]+)*', version):
                            version = f"v{version}"
                        enriched['version'] = version
                        success = True
            
            # Use VERSION_HAND fallback
            if not success and enriched.get('version_hand'):
                enriched['version'] = enriched['version_hand']
                success = True
        
        if not success:
            self.stats['auto_enrichment_fails'][field].append(chain_name)
        
        return success

    async def _enrich_config(self, session: aiohttp.ClientSession, config: Dict[str, Any], chain_name: str) -> Dict[str, Any]:
        """Enrich configuration with auto-detection"""
        # Validate required fields
        required = ['CHAIN_NAME', 'CHAIN_SYSTEM_NAME']
        missing = [f for f in required if not config.get(f)]
        if missing:
            raise SyncError(f"Missing required fields: {missing}")
        
        # Convert to lowercase for Jinja2
        enriched = {k.lower(): v for k, v in config.items()}
        
        # Auto-enrich fields sequentially to avoid endpoint overload
        auto_fields = [f for f in ['chain_id', 'endpoint_peer', 'version'] if enriched.get(f) == 'auto']
        if auto_fields:
            self.stats['total_auto_fields'] += len(auto_fields)
            
            for field in auto_fields:
                success = await self._auto_enrich_field(session, enriched, field, chain_name)
                if success:
                    self.stats['resolved_auto_fields'] += 1
        
        # Set defaults
        if not enriched.get('endpoint_seed') and enriched.get('endpoint_peer') != 'auto':
            enriched['endpoint_seed'] = enriched.get('endpoint_peer', '')
        
        if enriched.get('github_folder_name') == 'auto' and enriched.get('social_github'):
            enriched['github_folder_name'] = enriched['social_github'].rstrip('/').split('/')[-1]
        
        return enriched

    async def _get_snapshot_info(self, session: aiohttp.ClientSession, chain_name: str, scope: str) -> Dict[str, Any]:
        """Get snapshot information from noders.services"""
        base_url = f"https://snapshots{'-t' if scope == 'testnet' else ''}.noders.services"
        content = await self._fetch_text(session, f"{base_url}/{chain_name}/")
        
        if not content:
            return self._default_snapshot_info(f"{base_url}/{chain_name}/")
        
        matches = re.findall(f'"{chain_name}.*\\.tar\\.lz4"', content)
        if not matches:
            return self._default_snapshot_info()
        
        filename = matches[-1].strip('"')
        file_url = f"{base_url}/{chain_name}/{filename}"
        headers = await self._fetch_headers(session, file_url)
        
        if not headers:
            return self._default_snapshot_info()
        
        size_bytes = headers.get('Content-Length')
        size = f"{int(size_bytes) / (1024**3):.2f} GB" if size_bytes else "-"
        block_match = re.search(r'\d+', filename)
        
        return {
            'snap_latest_block': block_match.group() if block_match else "-",
            'snap_archive_name': filename,
            'snap_archive_link': file_url,
            'snap_archive_download_command': f"curl -o - -L {file_url} | lz4 -d | tar -x -C {{{{ daemon_home }}}}",
            'timestamp': headers.get('Last-Modified', '-'),
            'size': size
        }

    def _default_snapshot_info(self, snap_url: Optional[str] = None) -> Dict[str, Any]:
        return {
            'snap_latest_block': '-', 'snap_archive_name': '', 'snap_archive_link': snap_url,
            'snap_archive_download_command': f'Snapshot file is not available, you can find it on {snap_url}',
            'timestamp': '-', 'size': '-'
        }

    async def _get_live_peers(self, session: aiohttp.ClientSession, endpoint_rpc: str) -> Dict[str, Any]:
        """Get live peers information"""
        data = await self._fetch_json(session, f"{endpoint_rpc.rstrip('/')}:443/net_info")
        if not data:
            return {'live_peers_count': '0', 'live_peers_all': '', 'live_peers_random': ''}
        
        peer_list = []
        for peer in data.get('result', {}).get('peers', []):
            node_info = peer.get('node_info', {})
            peer_id = node_info.get('id')
            remote_ip = peer.get('remote_ip')
            listen_addr = node_info.get('listen_addr', '')
            
            if peer_id and remote_ip and listen_addr:
                port = listen_addr.split(':')[-1] if ':' in listen_addr else listen_addr
                peer_list.append(f"{peer_id}@{remote_ip}:{port}")
        
        random_peers = random.sample(peer_list, min(5, len(peer_list)))
        
        return {
            'live_peers_count': str(len(peer_list)),
            'live_peers_all': ','.join(peer_list),
            'live_peers_random': ','.join(random_peers)
        }

    async def _render_template(self, template_name: str, context: Dict[str, Any], output_path: Path, chain_name: str):
        """Render and save template"""
        try:
            template = self.jinja_env.get_template(template_name)
            content = template.render(context)
            
            output_path.parent.mkdir(parents=True, exist_ok=True)
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            self.stats['template_fails'].append(f"{chain_name}:{template_name}")
            raise SyncError(f"Failed to render {template_name} for {chain_name}: {e}")

    async def _process_chain(self, session: aiohttp.ClientSession, config_path: Path, scope: str):
        """Process a single blockchain chain"""
        chain_name = config_path.stem
        
        try:
            # Read and enrich configuration
            config = self._read_config(config_path)
            if not config:
                raise SyncError(f"Empty configuration: {config_path}")
            
            enriched = await self._enrich_config(session, config, chain_name)
            enriched['scope'] = scope
            
            chain_system_name = enriched.get('chain_system_name', '')
            if not chain_system_name:
                raise SyncError(f"No chain_system_name in {config_path}")
            
            scope_dir = self.docs_dir / f"{scope}-networks"
            chain_dir = scope_dir / chain_system_name
            
            # Fetch dynamic data concurrently (different endpoints)
            tasks = []
            if enriched.get('update_snapshot', 'false').lower() == 'true':
                tasks.append(('snapshot', self._get_snapshot_info(session, chain_system_name, scope)))
            if enriched.get('update_live_peers', 'false').lower() == 'true':
                tasks.append(('peers', self._get_live_peers(session, enriched.get('endpoint_rpc', ''))))
            
            if tasks:
                results = await asyncio.gather(*[task for _, task in tasks], return_exceptions=True)
                for i, result in enumerate(results):
                    if isinstance(result, dict):
                        enriched.update(result)
            
            # Render templates concurrently
            template_configs = [
                ('update_main', f'{chain_system_name}.mdx', scope_dir, 'main.mdx.j2'),
                ('update_category', '_category_.json', chain_dir, '_category_.json.j2'),
                ('update_install', 'install.mdx', chain_dir, 'install.mdx.j2'),
                ('update_upgrade', 'upgrade.mdx', chain_dir, 'upgrade.mdx.j2'),
                ('update_snapshot', 'snapshot.mdx', chain_dir, 'snapshot.mdx.j2'),
                ('update_statesync', 'statesync.mdx', chain_dir, 'statesync.mdx.j2'),
                ('update_live_peers', 'seeds-and-peers.mdx', chain_dir, 'seeds-and-peers.mdx.j2'),
                ('update_cli_cheatsheet', 'cli-cheatsheet.mdx', chain_dir, 'cli-cheatsheet.mdx.j2'),
                ('update_endpoints', 'endpoints.mdx', chain_dir, 'endpoints.mdx.j2'),
                ('update_monitoring', 'monitoring.mdx', chain_dir, 'monitoring.mdx.j2'),
            ]
            
            render_tasks = [
                self._render_template(template_file, enriched, output_dir / output_file, chain_name)
                for flag, output_file, output_dir, template_file in template_configs
                if enriched.get(flag, 'false').lower() == 'true'
            ]
            
            if render_tasks:
                await asyncio.gather(*render_tasks)
            
            print(f"✅ {chain_name}")
            self.stats['processed'] += 1
            
        except Exception as e:
            self.stats['failed'] += 1
            self.stats['chain_failures'][scope].append(f"{chain_name}: {str(e)}")
            self._log(str(e), "ERROR", chain_name)
            raise

    def _print_statistics(self):
        """Print comprehensive final statistics"""
        print(f"\n{'=' * 60}")
        print("📊 FINAL STATISTICS")
        print("=" * 60)
        
        # Overall stats
        total = self.stats['processed'] + self.stats['failed']
        print(f"📈 Total chains: {total}")
        print(f"✅ Successfully processed: {self.stats['processed']}")
        print(f"❌ Failed: {self.stats['failed']}")
        
        # Auto-enrichment stats
        if self.stats['total_auto_fields'] > 0:
            success_rate = (self.stats['resolved_auto_fields'] / self.stats['total_auto_fields']) * 100
            print(f"\n🔄 Auto-enrichment: {self.stats['resolved_auto_fields']}/{self.stats['total_auto_fields']} ({success_rate:.1f}%)")
            
            for field, chains in self.stats['auto_enrichment_fails'].items():
                if chains:
                    chains_display = ', '.join(chains[:5])
                    if len(chains) > 5:
                        chains_display += f', ... ({len(chains) - 5} more)'
                    print(f"  ❌ {field} failed ({len(chains)}): {chains_display}")
        
        # Chain failures by scope
        if self.stats['chain_failures']:
            print(f"\n💥 Chain failures:")
            for scope, failures in self.stats['chain_failures'].items():
                if failures:
                    print(f"  📍 {scope} ({len(failures)}):")
                    for failure in failures[:3]:
                        print(f"    • {failure}")
                    if len(failures) > 3:
                        print(f"    • ... and {len(failures) - 3} more")
        
        # Template failures
        if self.stats['template_fails']:
            template_display = ', '.join(self.stats['template_fails'][:5])
            if len(self.stats['template_fails']) > 5:
                template_display += f", ... ({len(self.stats['template_fails']) - 5} more)"
            print(f"\n📝 Template failures ({len(self.stats['template_fails'])}): {template_display}")
        
        print(f"\n📁 Output directory: {self.docs_dir}")

    async def sync_all(self, skip_precheck: bool = False):
        """Main synchronization method"""
        print("🚀 SEQUENTIAL BLOCKCHAIN SYNC")
        print("⚠️ STRICT MODE: Will fail on any errors\n")
        
        if not skip_precheck and not self.run_pre_check():
            sys.exit(1)
        
        if not skip_precheck:
            print()
        
        # Connection settings optimized for sequential processing
        connector = aiohttp.TCPConnector(limit=20, limit_per_host=5)
        timeout = aiohttp.ClientTimeout(total=60, connect=15)
        
        try:
            async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
                total_chains = 0
                
                for scope, scope_name in [("mainnet-networks", "mainnet"), ("testnet-networks", "testnet")]:
                    scope_dir = self.config_dir / scope
                    if not scope_dir.exists():
                        continue
                        
                    config_files = [f for f in scope_dir.glob("*") if f.is_file() and not f.name.startswith('.')]
                    if not config_files:
                        continue
                    
                    print(f"{'=' * 50}")
                    print(f"📡 PROCESSING {scope_name.upper()} ({len(config_files)} chains)")
                    print("=" * 50)
                    
                    # Process chains sequentially
                    for i, config_file in enumerate(config_files, 1):
                        print(f"🔄 [{i}/{len(config_files)}] {config_file.stem}")
                        try:
                            await self._process_chain(session, config_file, scope_name)
                            total_chains += 1
                        except Exception as e:
                            print(f"❌ Failed to process {config_file.stem}: {e}")
                            continue
                
                if total_chains == 0:
                    raise SyncError("No configuration files found")
            
        except Exception as e:
            self._log(f"Critical sync failure: {e}", "ERROR")
            raise
        
        # Print comprehensive statistics
        self._print_statistics()
        
        if self.stats['failed'] > 0:
            print("\n⚠️ SYNC COMPLETED WITH SOME FAILURES")
            print("📋 Check the statistics above for details")
        else:
            print("\n✅ SYNC COMPLETED SUCCESSFULLY")


async def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Sequential blockchain documentation sync")
    parser.add_argument("--config-dir", default=".", help="Config directory (default: .)")
    parser.add_argument("--docs-dir", default="../docs", help="Output directory (default: ../docs)")
    parser.add_argument("--skip-precheck", action="store_true", help="Skip pre-check validation")
    parser.add_argument("--precheck-only", action="store_true", help="Only run pre-check")
    
    args = parser.parse_args()
    
    try:
        syncer = BlockchainSyncer(args.config_dir, args.docs_dir)
        
        if args.precheck_only:
            success = syncer.run_pre_check()
            sys.exit(0 if success else 1)
        else:
            await syncer.sync_all(skip_precheck=args.skip_precheck)
            
    except Exception as e:
        print(f"\n💥 FATAL ERROR: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main()) 