---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-union">
# Live Peers
</div>
###### Chain ID: `union-testnet-6` | Current Node Version: `v0.19.0`

## All Live Peers for Union
Here is a list of 20 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
47ce6b06a2bf37fe03b441223dddb2dada7a57dc@89.117.57.48:26656,95cad72214c471bb04398b3e6f5c3236977a53bd@136.243.239.129:26656,5672cfa4d0847707cd5a94ef0cd573cb26dca962@114.246.195.56:20725,b82b7b8d739c0869b0c2c369770a3adf66a126cb@198.244.179.173:26656,9eb56cb3016c7aae59f8f67b890d1d21c04fa383@109.205.182.125:17156,1b5b5a948ccab77824d89ed7b0d2c098492eb22f@195.201.95.185:26656,19269f4fe5b85626bf7611274c5fc1da55671d34@195.201.108.92:26656,111d9dc3f797cf1c0f666e685363fc813f125559@80.79.6.173:26656,e53fb8078290d9933abec7c3265e45d94ee16f56@161.97.132.116:17156,7e73b4b0713cbf4c2bc2f8dabf5e5dd3db997599@89.58.10.135:17156,0c93a2ec330b9c291cce2fa992fb7b11813f9aa7@65.108.12.253:19007,d3d46afd3f313a3d0db9bcb165dc44f1b6afa0a2@157.90.112.79:26656,95933dd1160142d6dc6c3ba8148766d435b854e2@37.60.226.243:26656,56e5fe1d2da0a1ece4e38a511a3877293ee71c38@65.109.36.231:41656,0a167e1b5646a9852cba2cc88fbd674f75dc965d@80.79.6.154:26656,de45afe750c41193d2644083e23bd56bcf755177@209.126.86.119:26656,f6c96e667744081702505dbe45cfcc6815c39555@89.58.42.15:17156,3568df0ccdeb088f1b217769f7e0457c19c484e7@194.163.150.31:17156,ae5f1acd0381ea9c951aa16c10739e2624755462@5.104.82.21:26656,5f5decb01f14ec2031347a45b830ea153ed6b25a@65.109.93.58:24656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=b82b7b8d739c0869b0c2c369770a3adf66a126cb@198.244.179.173:26656,de45afe750c41193d2644083e23bd56bcf755177@209.126.86.119:26656,7e73b4b0713cbf4c2bc2f8dabf5e5dd3db997599@89.58.10.135:17156,d3d46afd3f313a3d0db9bcb165dc44f1b6afa0a2@157.90.112.79:26656,0a167e1b5646a9852cba2cc88fbd674f75dc965d@80.79.6.154:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.union/config/config.toml

sudo systemctl restart uniond
sudo journalctl -fu uniond --no-hostname -o cat
```

## Our peer for Union
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
d9967a42d574c59a66af1a25dade03af6a41b979@union-t-rpc.noders.services:11656
```
