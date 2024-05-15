---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-mantra">
# Live Peers
</div>
###### Chain ID: `mantra-hongbai-1` | Current Node Version: `v3.0.0`

## All Live Peers for Mantra
Here is a list of 22 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
195cc6dd355d0363e9c53c4dbc8210dfb98b1358@46.4.5.45:25156,4654c083fe41dc9b86e5a8c2ed5d1af772d394b7@62.169.29.195:23656,b96924d146c3afbfe13c8e9859ce989399228a29@176.57.189.36:12656,d6016af7cb20cf1905bd61468f6a61decb3fd7c0@34.72.142.50:26656,72557073a1d7c2bbe059b0127fd8ba691c16fe06@45.144.232.61:22656,21f1935bd0fb60a823af4a75d45c79c486c2bea0@94.72.114.180:16456,3e2d4f65fbf707b3034e50565709efba27b0b485@159.69.106.251:26656,140de77820b76a54599645ace9e9a50305daba64@185.196.20.238:16456,73956e737ba09e773136a547d804faa6053caf57@77.237.239.158:12656,99eeb1fca4fb5b6fd4cbaf71c3d86c20f3f6c915@185.84.224.125:25156,4d66530f56713971dbf4f105eda8afddc7697118@192.99.20.53:31656,01c4a10936c75d77046444b885badccffaa21d8a@94.72.116.9:22656,f80cb8b3a5492b6c4a442eb2ea7d1681240ebe61@193.30.121.54:25156,2df175a07e23d38a9e7c8d19dc1662c96f079539@178.128.113.181:26656,a20919f685a4a374d1a30fea5326127bfa208a01@62.169.17.140:23656,dae4865e67f7f1ff8a423ef81824cc09d33b6fd2@109.123.250.123:656,1d5fb70bb9d27683bd8ac6f01f473601b39cb29e@46.4.55.46:30656,a9a71700397ce950a9396421877196ac19e7cde0@65.108.231.124:22656,b4bcdfa729e13aaaf2a65aa35198d6b4d0109be2@167.235.102.45:11456,0b26d69b7711c4a13594ebed10fbd25b87bc3f74@109.199.105.39:16456,6e87b0f28a4f1b1203bc261d7a07d3656fc57f90@173.212.246.72:23656,913ed07a5c5fe3f4ea7ddbfbd3dceffa4a1126b6@38.242.251.142:14656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=140de77820b76a54599645ace9e9a50305daba64@185.196.20.238:16456,0b26d69b7711c4a13594ebed10fbd25b87bc3f74@109.199.105.39:16456,195cc6dd355d0363e9c53c4dbc8210dfb98b1358@46.4.5.45:25156,3e2d4f65fbf707b3034e50565709efba27b0b485@159.69.106.251:26656,f80cb8b3a5492b6c4a442eb2ea7d1681240ebe61@193.30.121.54:25156
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.mantrachaind/config/config.toml

sudo systemctl restart mantrachaind
sudo journalctl -fu mantrachaind --no-hostname -o cat
```

## Our peer for Mantra
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
f32589afc557a5c4a372f38dae72fbaaa8a5b98d@mantra-t-rpc.noders.services:30656
```
