---
hide_table_of_contents: false
title: Live peers*
sidebar_position: 5
---

<div class="h1-with-icon icon-osmosis">
# Live Peers
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

## All Live Peers for Osmosis
Here is a list of       29 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
bb14430cd32725447f62c0436454b31f4fdea0b8@65.109.118.148:28656,27740d856eb1eab4580279365b858d1cb5459acd@65.109.93.152:38656,dc0bc80ba2e2d579a9e460b602ce9f50d869a014@93.115.25.178:2000,f860ee99ef34f10155065a97e95da07f712f1d6b@116.202.169.6:26666,2cacea96ad46392ce733bb7fe009ce9a142da137@37.27.61.49:11656,2d7b93da6155a20298c3ceb952cee1fd7a9cd2d0@136.144.51.169:36656,3720900feebf46ec44c3c2c377e63e6d9c4ab3c6@131.153.165.85:26656,8d62dfa437917bff46c18b650fab3cb7091554db@141.94.73.39:38656,b09bf90af67e47827dc01e369d0f381979b06a54@193.34.212.220:26656,ee43bc85f762aca4ef30d76597d2b861200f1958@95.217.143.167:22656,89b6c99ecd215cbd7eeac7fe9636295600198621@176.9.158.219:41056,fe59ea90807b55dbeff4b292977e6f1db3f1f583@94.23.168.88:26656,709a475959c1c491aab37f1ea0b41657d71d1d79@65.109.118.169:36656,729219c108c059824ea9a17c09d11adc99226db4@66.172.36.139:36656,74ea33e040d84b67011298e21128930f8882cb94@35.247.99.215:12556,ecb1211762cc8c1dbc620a95d9a2f7373983d012@65.109.144.236:27656,e46f865ad2a0c7f87667d2a08f2083766b875c71@65.108.197.163:30656,e83c322769d616a7e94f71e01f303cdc00e37441@188.166.220.245:26656,34ae1a6664529f016eac50d30a9212a19febc343@65.108.142.81:26679,34ae1a6664529f016eac50d30a9212a19febc343@65.108.142.81:26679,53eab9227d7f5b073fa1300fb66e39e724901e60@65.109.88.96:56656,e891d42c31064fb7e0d99839536164473c4905c2@47.147.226.147:31656,57ab9cf623124bdf55bab1261c7feea780957a6c@65.21.113.10:61456,37c195e518c001099f956202d34af029b04f2c97@65.109.20.216:26656,ce7f7453e2b306bc670057e9055b142af2424b53@65.108.12.253:26656,15a6de22f85da18b3b17345122a584a81aad29cc@142.132.136.106:21656,7d850e9300a7754e5e63dd0feed20505d6831bb6@65.109.117.113:27456,f896016cbf494a8da970de2707b0f3c982c760a2@164.92.91.142:26656,3b1c206510bd1675d06c0d8a367da67776b597e6@65.109.50.183:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=f896016cbf494a8da970de2707b0f3c982c760a2@164.92.91.142:26656,53eab9227d7f5b073fa1300fb66e39e724901e60@65.109.88.96:56656,e83c322769d616a7e94f71e01f303cdc00e37441@188.166.220.245:26656,7d850e9300a7754e5e63dd0feed20505d6831bb6@65.109.117.113:27456,74ea33e040d84b67011298e21128930f8882cb94@35.247.99.215:12556
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.osmosisd/config/config.toml

sudo systemctl restart osmosisd.service
sudo journalctl -fu osmosisd.service --no-hostname -o cat
```

## Ours Peer for Osmosis
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
91570c5f4e2a54ce53996475aea4f530e0669a2e@osmosis.rpc.mainnet.noders.team:10656
```