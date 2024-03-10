---
hide_table_of_contents: false
title: State sync
sidebar_position: 4
---

# State sync

```bash
SNAP_RPC=https://arable.rpc.m.anode.team:443 && \
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) && \
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
```
```bash
sudo systemctl stop acred && acred tendermint unsafe-reset-all --home $HOME/.acred --keep-addr-book
```
```bash
peers="e8d03dd64cdd5658167d0b1913c9fd1f05c80d9a@144.76.97.251:29966"
sed -i.bak -e  "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" $HOME/.acred/config/config.toml
```
```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" $HOME/.acred/config/config.toml
```
```bash
sudo systemctl restart acred && journalctl -fu acred -o cat
```