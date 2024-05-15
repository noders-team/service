---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-swisstronic">
# Live Peers
</div>
###### Chain ID: `swisstronik_1291-1` | Current Node Version: `v1.0.1`

## All Live Peers for Swisstronic
Here is a list of 10 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
e147b3723835758bbef2fb7a14349dcdc6290223@148.113.1.198:26656,ae374e4f38be1e271669c5928d43c5914350a92a@57.129.1.46:26656,3360cb590addc861a77550d02865008f64d067db@148.113.8.196:26656,c5dbced5fef3a5b14d3c3f4613a901d54455da43@141.95.169.103:26656,4e5574f195f4dc6d0252a37867b951226561647d@57.129.28.2:26656,3c5d5d40f6855050d79e50f7dc408733a040553d@148.113.8.139:26656,da7875803737641f5c8c0b691cf97d9de06f0ede@148.113.20.157:26656,533a0b6810f5c7d1c9f4a082bd2cd008026a556b@146.59.55.71:26656,30a48cb6e669c1a6e1b46af6b5b27aa79d3db63b@148.113.9.115:26656,38b85901aa0eccb8c3219ca75ec02761cea26746@198.244.215.142:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=3c5d5d40f6855050d79e50f7dc408733a040553d@148.113.8.139:26656,da7875803737641f5c8c0b691cf97d9de06f0ede@148.113.20.157:26656,30a48cb6e669c1a6e1b46af6b5b27aa79d3db63b@148.113.9.115:26656,4e5574f195f4dc6d0252a37867b951226561647d@57.129.28.2:26656,e147b3723835758bbef2fb7a14349dcdc6290223@148.113.1.198:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.swisstronik/config/config.toml

sudo systemctl restart swisstronikd
sudo journalctl -fu swisstronikd --no-hostname -o cat
```

## Our peer for Swisstronic
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
1db22294bec0fd095eaa4a3f2381aef5105b538c@swisstronik-t-rpc.noders.services:26656
```
