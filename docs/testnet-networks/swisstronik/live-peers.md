---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-swisstronik">
# Live Peers
</div>
###### Chain ID: `swisstronik_1291-1` | Current Node Version: `v1.0.6`

## All Live Peers for Swisstronik
Here is a list of 12 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
6a3be625de39e3db02e6cda719d8c564dfde8086@148.113.16.99:26656,ae374e4f38be1e271669c5928d43c5914350a92a@57.129.1.46:26656,65148317b99e5d7bff65461eee86507546772bff@57.129.18.170:26656,faf98ecdbaba68f0c8483618ca9f2842b374031c@146.59.110.154:26656,575d7c50fc6ec6a8b233659551499a6ece864bd0@57.128.193.157:26656,f05c4343d2df801ba05a5ec7bd9954d8728fdb36@148.113.9.91:26656,a9a1aedec8b3a8da921afaa7a7ca6e828207f963@57.128.193.118:23756,c5dbced5fef3a5b14d3c3f4613a901d54455da43@141.95.169.103:26656,d5e1bb92c3c264124f7accbd3f7e6a472401f256@148.113.17.9:26656,b368e2232e4cdec602c96b77505401f94a643847@148.113.1.150:17156,1d6ed28a0cd141d402c4e9f69137c6e0541ef1b8@148.113.16.43:26656,4e5574f195f4dc6d0252a37867b951226561647d@57.129.28.2:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=c5dbced5fef3a5b14d3c3f4613a901d54455da43@141.95.169.103:26656,ae374e4f38be1e271669c5928d43c5914350a92a@57.129.1.46:26656,a9a1aedec8b3a8da921afaa7a7ca6e828207f963@57.128.193.118:23756,f05c4343d2df801ba05a5ec7bd9954d8728fdb36@148.113.9.91:26656,575d7c50fc6ec6a8b233659551499a6ece864bd0@57.128.193.157:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.swisstronik/config/config.toml

sudo systemctl restart swisstronikd
sudo journalctl -fu swisstronikd --no-hostname -o cat
```

## Our peer for Swisstronik
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
1db22294bec0fd095eaa4a3f2381aef5105b538c@swisstronik-t-rpc.noders.services:26656
```