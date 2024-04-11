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
30a48cb6e669c1a6e1b46af6b5b27aa79d3db63b@148.113.9.115:26656,5252115ffe888beaf35e00a7bfe92f1aa4210ddb@37.59.22.150:26656,5cada5d76c6fddab74981b4ca430e0771b6ec35e@57.129.28.235:26656,3cb2105b9ae008f0711ca5d2e285485b6c3ad1ec@148.113.8.228:26656,b368e2232e4cdec602c96b77505401f94a643847@148.113.1.150:17156,1f35bf4128576d94c99297a2e33b06b7ee0ae3d2@146.59.111.161:26656,79a61fe7d8dfe68d3a3b7abf8b96db708ab4cf14@148.113.9.130:26656,08dd07a1d78fc127caf43aa877f437d2bd01a8fe@148.113.16.236:26656,938602a61369289178895f26669859b64dea588f@2001:26656,38b85901aa0eccb8c3219ca75ec02761cea26746@198.244.215.142:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=3cb2105b9ae008f0711ca5d2e285485b6c3ad1ec@148.113.8.228:26656,b368e2232e4cdec602c96b77505401f94a643847@148.113.1.150:17156,30a48cb6e669c1a6e1b46af6b5b27aa79d3db63b@148.113.9.115:26656,38b85901aa0eccb8c3219ca75ec02761cea26746@198.244.215.142:26656,79a61fe7d8dfe68d3a3b7abf8b96db708ab4cf14@148.113.9.130:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.swisstronik/config/config.toml

sudo systemctl restart swisstronik.service
sudo journalctl -fu swisstronik.service --no-hostname -o cat
```

## Our peer for Swisstronic
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
1db22294bec0fd095eaa4a3f2381aef5105b538c@swisstronik-t-rpc.noders.services:26656
```