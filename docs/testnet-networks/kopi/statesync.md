---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-kopi">
# State sync
</div>
###### Chain ID: `kopi-test-5` | Current Node Version: `v0.6-7-g4d38756`

```bash
SNAP_RPC=https://kopi-t-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop uxkp && uxkp tendermint unsafe-reset-all --home ~/.kopid --keep-addr-book
```
```bash
peers="e53411eb5216857b6625ed7970f343d003ed65a0@kopi-t-rpc.noders.services:27656"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.kopid/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.kopid/config/config.toml
```
```bash
sudo systemctl restart uxkp && sudo journalctl -fu uxkp --no-hostname -o cat
```