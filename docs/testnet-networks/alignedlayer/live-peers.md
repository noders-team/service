---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-alignedlayer">
# Live Peers
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `v0.1.0`

## All Live Peers for Alignedlayer
Here is a list of 5 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
8509d4935357ae5dde2f172160dcf2cd10ef29a0@84.247.170.45:24256,8df218af7275abb65eedac6f75163b542a092b40@185.237.253.236:26656,7d211c9e79cf05df5a8877524612d2d2d8e44542@65.109.115.100:27262,7a77c6c6cbe64d161937f8773216e6d2e5a73e36@65.109.104.39:26656,cd0bd1efb5fde236b894f104c6e6fdb7c7b50baa@185.183.32.155:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=8df218af7275abb65eedac6f75163b542a092b40@185.237.253.236:26656,cd0bd1efb5fde236b894f104c6e6fdb7c7b50baa@185.183.32.155:26656,7a77c6c6cbe64d161937f8773216e6d2e5a73e36@65.109.104.39:26656,7d211c9e79cf05df5a8877524612d2d2d8e44542@65.109.115.100:27262,8509d4935357ae5dde2f172160dcf2cd10ef29a0@84.247.170.45:24256
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.alignedlayer/config/config.toml

sudo systemctl restart alignedlayerd
sudo journalctl -fu alignedlayerd --no-hostname -o cat
```

## Our peer for Alignedlayer
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
b5da413b7882dc42172818914f55e661fcb88981@aligned-t-rpc.noders.services:27656
```
