---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-fuel">
# State sync
</div>
###### Chain ID: `seq-mainnet-1` | Current Node Version: `seq-mainnet-1.2-improved-sidecar`

```bash
SNAP_RPC=https://fuel-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop fuelsequencerd && fuelsequencerd tendermint unsafe-reset-all --home ~/.fuelsequencer --keep-addr-book
```
```bash
peers="f448e03843413c85cc423302e9c07316d4913f04@fuel-rpc.noders.services:38556"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.fuelsequencer/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.fuelsequencer/config/config.toml
```
```bash
sudo systemctl restart fuelsequencerd && sudo journalctl -fu fuelsequencerd --no-hostname -o cat
```
