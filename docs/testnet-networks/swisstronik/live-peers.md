---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-swisstronik">
# Live Peers
</div>
###### Chain ID: `swisstronik_1291-1` | Current Node Version: `v1.0.1`

## All Live Peers for Swisstronik
Here is a list of 10 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
75847ee2f73b8783e17042b70b52ddca9f263f54@198.244.215.141:25656,533a0b6810f5c7d1c9f4a082bd2cd008026a556b@146.59.55.71:26656,7c42a55317deda257fee06bc48574fa3444967db@37.59.18.38:27656,08dd07a1d78fc127caf43aa877f437d2bd01a8fe@148.113.16.236:26656,30a48cb6e669c1a6e1b46af6b5b27aa79d3db63b@148.113.9.115:26656,06a9ff976bd15a656a08f1e223e0e75445cad69d@148.113.16.220:26656,b368e2232e4cdec602c96b77505401f94a643847@148.113.1.150:17156,dd3b1132e8108ab6ca45a04148b97ae7185e4bcd@148.113.16.164:26656,f05c4343d2df801ba05a5ec7bd9954d8728fdb36@148.113.9.91:26656,34182f5838bc6088924d7dd82897f46edaf33a24@148.113.1.140:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=08dd07a1d78fc127caf43aa877f437d2bd01a8fe@148.113.16.236:26656,30a48cb6e669c1a6e1b46af6b5b27aa79d3db63b@148.113.9.115:26656,06a9ff976bd15a656a08f1e223e0e75445cad69d@148.113.16.220:26656,7c42a55317deda257fee06bc48574fa3444967db@37.59.18.38:27656,34182f5838bc6088924d7dd82897f46edaf33a24@148.113.1.140:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.swisstronik/config/config.toml

sudo systemctl restart swisstronikd
sudo journalctl -fu swisstronikd --no-hostname -o cat
```

## Our peer for Swisstronik
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
1db22294bec0fd095eaa4a3f2381aef5105b538c@swisstronik-t-rpc.noders.services:26656
```
