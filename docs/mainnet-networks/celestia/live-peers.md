---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-celestia">
# Live Peers
</div>
###### Chain ID: `celestia` | Current Node Version: `v1.9.0`

## All Live Peers for Celestia
Here is a list of 10 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
d6d8536233c8529f8a436a31065ecb365a96f71e@148.251.53.24:11656,a86cfe5a22e73ff0c9ceec388e9b52bf8355efdd@85.239.233.57:2000,62f006684e2628896facc8ca8f35ab989edaf353@51.178.88.49:26656,582dd98fd17095c6d65e024a784234dad2569aff@57.128.175.47:14956,bc81d0016c1676fd339d3a69ef9676ba148f81e0@139.64.137.122:35656,d535cbf8d0efd9100649aa3f53cb5cbab33ef2d6@172.93.102.144:40656,b519fc0c69726b43de28b82f998c8db7faf9741d@5.9.89.67:15670,1ed8174551113f6275c4a914fe20c8a59275fb55@116.202.238.252:26656,47f77ce9da8d17778a5bedcaa7f0a74f1c9eb8c7@67.209.54.244:26656,bf0bdc9a517ce2e92e0c2194a56a9eab23557489@91.134.22.4:32307
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=b519fc0c69726b43de28b82f998c8db7faf9741d@5.9.89.67:15670,bf0bdc9a517ce2e92e0c2194a56a9eab23557489@91.134.22.4:32307,47f77ce9da8d17778a5bedcaa7f0a74f1c9eb8c7@67.209.54.244:26656,bc81d0016c1676fd339d3a69ef9676ba148f81e0@139.64.137.122:35656,62f006684e2628896facc8ca8f35ab989edaf353@51.178.88.49:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.celestia-app/config/config.toml

sudo systemctl restart celestia-appd
sudo journalctl -fu celestia-appd --no-hostname -o cat
```

## Our peer for Celestia
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
27f6bac8492b1597146b6c4aeddc4d328fa8ac28@celestia-rpc.noders.services:11656
```
