---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-osmosis">
# State sync
</div>
###### Chain ID: `osmo-test-5` | Current Node Version: `28.0.0-rc1`

```bash
SNAP_RPC=https://osmosis-t-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop osmosisd && osmosisd tendermint unsafe-reset-all --home ~/.osmosisd --keep-addr-book
```
```bash
peers="6147a54c107d366c4a1eb5196cb20b3498a31d83@osmosis-t-rpc.noders.services:10656"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.osmosisd/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.osmosisd/config/config.toml
```
```bash
sudo systemctl restart osmosisd && sudo journalctl -fu osmosisd --no-hostname -o cat
```