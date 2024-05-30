---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-umee">
# Live Peers
</div>
###### Chain ID: `umee-1` | Current Node Version: `v6.4.0`

## All Live Peers for UX
Here is a list of 23 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:16256,d6ead5ed853ed91e7ecf4bc0f321eba1d60a6acd@142.132.207.27:13656,88373a3bf385c20ef0b4040f924cd99848012535@135.181.113.227:26696,221fe4b92b36812d1accaa8a523c58b0d231a70c@136.243.95.31:13656,ec82788644c5d799dbe14fee40bf6e316ea70cb1@51.81.49.132:13656,09b47e850f9a7e2bf82d660b2693a34b58c0b489@65.108.73.245:26656,f07d8a2c36cbdadccd174ea0ddb2c6a3ed92380c@139.59.255.98:26656,d5f320c6e1443160c887deab487f7aa3830322ff@194.60.201.146:26656,0076b8b8614503e37caf4d7e0615d2dd894b76d4@65.109.118.196:13656,53df6cb0b42efac48d9b5400d38028b72f71abb3@135.125.4.73:26656,07778e27f5006525ea854d9d995fc13208fbec90@5.9.106.214:10256,a606843d0d2f2700f9b4bb3ed4e8b027ec960b8c@18.170.79.196:26656,9755cab2585a2794453a5b396ef13b893393366f@65.108.212.224:46682,0063e7076aa5a4d43d1cf89bc0bc2860ab131524@5.189.166.167:26656,4552a09808faa743b2ebf856a285ed621103d49d@44.221.227.158:26662,49788711104797cbd44dfc02ad8e2efb1c99ba34@95.214.52.174:22656,b948b0ab5e5b6eb23fe525a499d3a5365d05ee84@144.76.114.34:13656,cb24fcba3bdbf867a495d4a1c78224603bcb558b@135.181.210.171:10456,099363b18f8259cde5097b1801283aed2c3899ca@65.108.202.244:13656,3540cafda95ebf6d1ccc83744b9a4521ba881ee0@148.251.246.239:27007,109443243e1f2dc873b38de11bcdd6195143179f@65.109.33.48:10656,7f8b83fd029e33f5c69f2d3030b48e0785bd8af0@65.108.230.188:13656,2a258032796ce8b29d91d277318a5a45b2ce9654@142.132.159.188:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=53df6cb0b42efac48d9b5400d38028b72f71abb3@135.125.4.73:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:16256,09b47e850f9a7e2bf82d660b2693a34b58c0b489@65.108.73.245:26656,f07d8a2c36cbdadccd174ea0ddb2c6a3ed92380c@139.59.255.98:26656,d6ead5ed853ed91e7ecf4bc0f321eba1d60a6acd@142.132.207.27:13656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.umee/config/config.toml

sudo systemctl restart umeed
sudo journalctl -fu umeed --no-hostname -o cat
```

## Our peer for UX
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
8349a4ab1d96f63cd0c9ff603c9869810e4a8e15@umee-rpc.noders.services:32656
```
