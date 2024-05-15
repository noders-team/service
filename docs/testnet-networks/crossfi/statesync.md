---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-crossfi">
# State sync
</div>
###### Chain ID: `crossfi-evm-testnet-1` | Current Node Version: `v0.3.0-prebuild3`

```bash
SNAP_RPC=https://crossfi-t-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop crossfid && crossfid tendermint unsafe-reset-all --home ~/.mineplex-chain --keep-addr-book
```
```bash
peers="81000f9c5c412477c6ca442e9ead247e6118a515@crossfi-t-rpc.noders.services:12656"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.mineplex-chain/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.mineplex-chain/config/config.toml
```
```bash
sudo systemctl restart crossfid && sudo journalctl -fu crossfid --no-hostname -o cat
```
