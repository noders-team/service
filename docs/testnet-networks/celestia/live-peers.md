---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-celestia">
# Live Peers
</div>
###### Chain ID: `mocha-4` | Current Node Version: `v2.1.2`

## All Live Peers for Celestia
Here is a list of 16 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
5825260e6b1a535852d63c49f8cc670f0729d555@23.111.187.102:26116,c3d4e9daef6db3c1646ad7c4198b064361485299@65.109.126.24:26630,1eecce4c8d741979f955c83a2333ad2ade6cae89@65.108.103.17:26665,a8e6b8ba334ba7e9e7ffac6cbb3b1a6d99aed870@95.217.113.247:26656,85aef6d15d0197baff696b6e31c88e0f21073c59@162.55.245.144:2400,3e30bcfc55e7d351f18144aab4b0973e9e9bf987@65.108.226.183:11656,e726816f42831689eab9378d5d577f1d06d25716@164.152.163.148:36656,8f282e0237ec45dd0a959bd3e2872f088133a58a@31.7.196.17:26656,70e8a8941f32dc5f696e46ee836c27620e773065@78.46.65.144:26656,f3c76f618b984fd0ffe9888d16fc8c4687e1f0f3@54.251.130.26:26656,ad15d8af283f2bf0a9bf08aca1cffb695308641a@46.4.59.247:11656,a2b735a3f7364ee82ba2dcf18be607101998444f@94.130.35.35:18656,de181ebe22ce14483abbb8695bdb43c1169246af@185.144.99.223:26656,258f523c96efde50d5fe0a9faeea8a3e83be22ca@173.249.24.244:20279,ee9f90974f85c59d3861fc7f7edb10894f6ac3c8@65.109.16.220:26656,8194b4f9c4d558a0a4d4242bce9274892cbfb386@20.250.38.245:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=8f282e0237ec45dd0a959bd3e2872f088133a58a@31.7.196.17:26656,258f523c96efde50d5fe0a9faeea8a3e83be22ca@173.249.24.244:20279,8194b4f9c4d558a0a4d4242bce9274892cbfb386@20.250.38.245:26656,85aef6d15d0197baff696b6e31c88e0f21073c59@162.55.245.144:2400,e726816f42831689eab9378d5d577f1d06d25716@164.152.163.148:36656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.celestia-app/config/config.toml

sudo systemctl restart celestia-appd
sudo journalctl -fu celestia-appd --no-hostname -o cat
```

## Our peer for Celestia
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
2d40e73c3b0fcccc5c7806621ff9943a7fb3199e@celestia-t-rpc.noders.services:21656
```