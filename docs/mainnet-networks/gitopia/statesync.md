---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

<div class="h1-with-icon icon-gitopia">
# State sync
</div>
###### Chain ID: `gitopia` | Current Node Version: `v5.1.0`

```bash
SNAP_RPC=https://gitopia-rpc.noders.services:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop gitopiad && gitopiad tendermint unsafe-reset-all --home ~/.gitopia --keep-addr-book
```
```bash
peers="8bd48e54552f091c1d8f194515754ab6ed74f054@gitopia-rpc.noders.services:11356"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" ~/.gitopia/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.gitopia/config/config.toml
```
```bash
sudo systemctl restart gitopiad && sudo journalctl -fu gitopiad --no-hostname -o cat
```
