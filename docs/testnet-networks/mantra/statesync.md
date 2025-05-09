---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-mantra">
# State sync
</div>
###### Chain ID: `mantra-dukong-1` | Current Node Version: `v4.0.0`

```bash
SNAP_RPC=https://mantra-t-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop mantrachaind && mantrachaind tendermint unsafe-reset-all --home ~/.mantrachaind --keep-addr-book
```
```bash
peers="8ac264aa8af65b4363f98fcab3fbc58c81b2ca90@mantra-t-rpc.noders.services:25156"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.mantrachaind/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.mantrachaind/config/config.toml
```
```bash
sudo systemctl restart mantrachaind && sudo journalctl -fu mantrachaind --no-hostname -o cat
```