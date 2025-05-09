---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-kyve">
# State sync
</div>
###### Chain ID: `kyve-1` | Current Node Version: `v2.1.0`

```bash
SNAP_RPC=https://kyve-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop kyved && kyved tendermint unsafe-reset-all --home ~/.kyve --keep-addr-book
```
```bash
peers="a3780bb3c6eb953dfd0019e61a37e054a18dd197@kyve-rpc.noders.services:11056"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.kyve/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.kyve/config/config.toml
```
```bash
sudo systemctl restart kyved && sudo journalctl -fu kyved --no-hostname -o cat
```
