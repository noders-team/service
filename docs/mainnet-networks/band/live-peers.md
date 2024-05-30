---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-band">
# Live Peers
</div>
###### Chain ID: `` | Current Node Version: `v2.5.4`

## All Live Peers for Band
Here is a list of 16 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
8809cff93bedd722c4eaa17570d70a29f3aac863@95.216.70.140:26656,06091faa832099014c45348abd56c531944698c8@65.108.226.166:26656,03d8998530017c29e57f1d164c556e28ff48e710@65.108.76.28:22956,2ff747c23213cca5551cf2f73762e2dfd555db0e@65.21.95.15:11056,618e7d04de1d08c1231322ac9fa7d459c9e9a25c@65.109.24.82:44656,f6c5ff15414bdaaeff59f555eae5ca745c03b37e@77.68.30.186:26656,bbef857a9fdf7d91059c73427d6d3af8c171a828@144.202.9.124:13100,420994846f175d0413796be9caea49e07ad3a503@65.109.99.157:16600,c4254584ff19eb934e01efd485278cea1820da32@15.235.115.152:13100,b538f373cf7a4c08d4fcd2977d3d6f242a937cb4@52.89.32.24:26656,b2cda4464e60ac7303f5da05fdbe0227a75842c5@135.181.166.19:26656,7ff95d67cb57b44eba11bed8f3a157eb42bf8311@153.139.245.107:26656,268c44707b65471851e70c26d00c8ec9261c15a4@65.108.122.246:26646,c3594887b3a4b6a7fb2355c8f3a03f50e3510f70@168.119.146.110:25656,4dcdc885ca61d758f5343a0afd1058e41cb36e73@37.27.112.99:26610,34959257a5baf0cd0b4b300975ccdede3167b909@34.126.152.67:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=268c44707b65471851e70c26d00c8ec9261c15a4@65.108.122.246:26646,420994846f175d0413796be9caea49e07ad3a503@65.109.99.157:16600,c4254584ff19eb934e01efd485278cea1820da32@15.235.115.152:13100,b538f373cf7a4c08d4fcd2977d3d6f242a937cb4@52.89.32.24:26656,4dcdc885ca61d758f5343a0afd1058e41cb36e73@37.27.112.99:26610
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.band/config/config.toml

sudo systemctl restart bandd
sudo journalctl -fu bandd --no-hostname -o cat
```

## Our peer for Band
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
@band-rpc.noders.services:
```
