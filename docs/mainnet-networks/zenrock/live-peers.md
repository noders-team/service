---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-zenrock">
# Live Peers
</div>
###### Chain ID: `diamond-1` | Current Node Version: `v5.5.0`

## All Live Peers for Zenrock
Here is a list of 3 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
5ad8a5de6318529994da817043b268ef617e37ba@54.216.86.166:26656,2f037a6461c012f3296ab1815b3c47843bcd7c3a@65.109.69.119:59656,4f93fec81eadc205dee1b63e766cc33d9f2e6767@54.195.115.195:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=5ad8a5de6318529994da817043b268ef617e37ba@54.216.86.166:26656,4f93fec81eadc205dee1b63e766cc33d9f2e6767@54.195.115.195:26656,2f037a6461c012f3296ab1815b3c47843bcd7c3a@65.109.69.119:59656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.zrchain/config/config.toml

sudo systemctl restart zenrockd
sudo journalctl -fu zenrockd --no-hostname -o cat
```

## Our peer for Zenrock
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
f2b52bc8a9931c9a1ea7090c7139b186733dcf73@zenrock-rpc.noders.services:49556
```
