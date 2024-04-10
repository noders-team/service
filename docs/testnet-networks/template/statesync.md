---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# State sync
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[VERSION]`

```bash
SNAP_RPC=[ENDPOINT_RPC]:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop [DAEMON_SERVICE] && [DAEMON_NAME] tendermint unsafe-reset-all --home [DAEMON_HOME] --keep-addr-book
```
```bash
peers="[ENDPOINT_PEER]"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" [DAEMON_HOME]/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" [DAEMON_HOME]/config/config.toml
```
```bash
sudo systemctl restart [DAEMON_SERVICE] && sudo journalctl -fu [DAEMON_SERVICE] --no-hostname -o cat
```