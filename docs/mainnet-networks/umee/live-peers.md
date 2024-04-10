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
Here is a list of 25 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
3eaae21c268a7871ce3fb1b9af1492f025f671e5@95.217.41.163:26656,88373a3bf385c20ef0b4040f924cd99848012535@135.181.113.227:26696,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:16256,f07d8a2c36cbdadccd174ea0ddb2c6a3ed92380c@139.59.255.98:26656,099363b18f8259cde5097b1801283aed2c3899ca@65.108.202.244:13656,5a8fface86f743e13a94c809592228468644674e@136.243.174.45:30032,19a0d3b45d7d61422f2294e60e179fcc89cef1fe@37.60.244.38:26656,adac4e59813948afba780284d0d7d5323146e3e2@94.72.163.178:16256,7f8b83fd029e33f5c69f2d3030b48e0785bd8af0@65.108.230.188:13656,2a258032796ce8b29d91d277318a5a45b2ce9654@142.132.159.188:26656,53df6cb0b42efac48d9b5400d38028b72f71abb3@135.125.4.73:26656,d5f320c6e1443160c887deab487f7aa3830322ff@194.60.201.146:26656,71c1bb8ff09759bf3ef777671299a7aedd63ae3c@65.109.92.241:26656,8afe9ff6e02e42a903dc91c760e1c57cae938e4f@18.169.188.120:26656,53752cabf4cbb3638d72a5abf323e4ee3c503f91@142.132.202.92:27656,23fc8e3c2dbf82f82142c046191ce07a87ac89a5@38.242.205.73:26656,180749d491b04eab3034d9e536706aaccd3b289d@65.108.235.36:19656,07778e27f5006525ea854d9d995fc13208fbec90@5.9.106.214:10256,31a9a17e10ee65263548b9958ae021c9802e3c4c@188.166.173.31:30156,49788711104797cbd44dfc02ad8e2efb1c99ba34@95.214.52.174:22656,ebc272824924ea1a27ea3183dd0b9ba713494f83@185.16.39.172:26756,66ba8da36f275dcbb0171d5db00ac1f65a2f4dcc@135.181.215.62:6020,9755cab2585a2794453a5b396ef13b893393366f@65.108.212.224:46682,0076b8b8614503e37caf4d7e0615d2dd894b76d4@65.109.118.196:13656,3d35a9f3dac463b31b7aad247b052d1f76dd5008@65.108.234.23:13656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=0076b8b8614503e37caf4d7e0615d2dd894b76d4@65.109.118.196:13656,8afe9ff6e02e42a903dc91c760e1c57cae938e4f@18.169.188.120:26656,53df6cb0b42efac48d9b5400d38028b72f71abb3@135.125.4.73:26656,88373a3bf385c20ef0b4040f924cd99848012535@135.181.113.227:26696,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:16256
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.umee/config/config.toml

sudo systemctl restart umeed.service
sudo journalctl -fu umeed.service --no-hostname -o cat
```

## Our peer for UX
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
8349a4ab1d96f63cd0c9ff603c9869810e4a8e15@umee-rpc.noders.services:32656
```