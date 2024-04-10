---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-union">
# Live Peers
</div>
###### Chain ID: `union-testnet-6` | Current Node Version: `vnull`

## All Live Peers for Union
Here is a list of 20 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
01fe0f9e6e3f3a82f51ebfa0f82d9cab66b224ae@95.217.107.96:26256,e6e14a51bba7460af1948a77a88a3c16ae11365d@37.252.184.231:26656,cf73a8aca5ca1c08bbe65f7e0d987a226068fb89@162.250.127.226:41156,d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:17156,0c93a2ec330b9c291cce2fa992fb7b11813f9aa7@65.108.12.253:19007,5672cfa4d0847707cd5a94ef0cd573cb26dca962@114.246.195.63:20725,9f591758d3d9b23ffdca11e22fa030f678566c4e@88.99.3.158:24656,9c57cef5a67971e59ed538e10f459f5e04e59eb3@202.61.237.202:26656,2f3a667cd348d694c2800b5625a44caa527e92a6@65.108.132.163:26656,95933dd1160142d6dc6c3ba8148766d435b854e2@37.60.226.243:26656,a98484ac9cb8235bd6a65cdf7648107e3d14dab4@116.202.231.58:17156,64a2af7138b10951fd8869e1c024a11285b8f798@123.138.66.165:17156,bbf8ef70a32c3248a30ab10b2bff399e73c6e03c@65.21.198.100:23156,b2f2c6ba26958a1daf5838dee130fe0f0d75518d@34.171.89.160:26656,2dad4529930a677fe267cedcac86043d09acdc36@65.108.105.48:24656,605710c9d36f1afd7cf380381522a7f127544967@148.251.235.130:15656,a1dd58a735c466d56d7c097f60cd2448bf46c8b6@84.46.245.222:17156,2812a4ae3ebfba02973535d05d2bbcc80b7d215f@65.108.231.124:23656,a0e32aff7707fda85ff87fa8ea6f93d3196984aa@188.40.66.173:24656,b8189774044f3177d5bf6ca99a5efbde8564227f@173.231.40.186:24656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:17156,64a2af7138b10951fd8869e1c024a11285b8f798@123.138.66.165:17156,2dad4529930a677fe267cedcac86043d09acdc36@65.108.105.48:24656,bbf8ef70a32c3248a30ab10b2bff399e73c6e03c@65.21.198.100:23156,b2f2c6ba26958a1daf5838dee130fe0f0d75518d@34.171.89.160:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.union/config/config.toml

sudo systemctl restart union.service
sudo journalctl -fu union.service --no-hostname -o cat
```

## Our peer for Union
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
d9967a42d574c59a66af1a25dade03af6a41b979@union-t-rpc.noders.services:11656
```