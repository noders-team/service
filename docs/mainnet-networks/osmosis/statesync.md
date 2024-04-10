---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-osmosis">
# State sync
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.8-iavl-v1`

```bash
SNAP_RPC=https://osmosis-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop osmosisd.service && osmosisd tendermint unsafe-reset-all --home ~/.osmosisd --keep-addr-book
```
```bash
peers="91570c5f4e2a54ce53996475aea4f530e0669a2e@osmosis-rpc.noders.services:10656"
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
sudo systemctl restart osmosisd.service && sudo journalctl -fu osmosisd.service --no-hostname -o cat
```