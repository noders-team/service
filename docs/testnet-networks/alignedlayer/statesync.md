---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-alignedlayer">
# State sync
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `v0.1.0`

```bash
SNAP_RPC=https://aligned-t-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop alignedlayerd.service && alignedlayerd tendermint unsafe-reset-all --home ~/.alignedlayer --keep-addr-book
```
```bash
peers="b5da413b7882dc42172818914f55e661fcb88981@aligned-t-rpc.noders.services:27656"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.alignedlayer/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.alignedlayer/config/config.toml
```
```bash
sudo systemctl restart alignedlayerd.service && sudo journalctl -fu alignedlayerd.service --no-hostname -o cat
```