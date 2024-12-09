---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-dymension">
# Live Peers
</div>
###### Chain ID: `froopyland_100-1` | Current Node Version: `v2.0.0-alpha.8`

## All Live Peers for Dymension
Here is a list of 10 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
8cfa8294df343880a1b1a112b05b09f4008c4eef@142.132.132.164:26656,b2d27b22628e8436db3e1f37ad8aa2ef56399942@207.244.241.160:26656,d17d58fddc764b626ee67bb0ada3e5f6d26d91c5@51.38.55.95:26656,aa755789a28dd8701ad1cd447866a2c029412199@144.76.18.199:26656,1e1171cdbe24dfc1eee76e802bdc366e93d36812@95.217.113.104:26656,c6329371271c247d35454862014dfd6ff5e3b680@65.108.141.109:49656,3de3ca4b5e2b83f0f999d0086c6324824f96bf67@65.109.93.124:28756,fb8e7966689eb0ad2486eebd714ebd8c3c66a0ab@37.27.52.123:41992,ec168a38efd7f2e5f645bcb5b8b9ab0029da9f3a@195.201.241.107:55696,60b254fbc8fb7f02cfdc1676b1624e14fbe31cb6@190.2.137.108:26666
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=ec168a38efd7f2e5f645bcb5b8b9ab0029da9f3a@195.201.241.107:55696,c6329371271c247d35454862014dfd6ff5e3b680@65.108.141.109:49656,aa755789a28dd8701ad1cd447866a2c029412199@144.76.18.199:26656,fb8e7966689eb0ad2486eebd714ebd8c3c66a0ab@37.27.52.123:41992,8cfa8294df343880a1b1a112b05b09f4008c4eef@142.132.132.164:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.dymension/config/config.toml

sudo systemctl restart dymd
sudo journalctl -fu dymd --no-hostname -o cat
```

## Our peer for Dymension
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
9ca1e11a113dd8732cbe64d8581a3f4fc7dcacaf@dymension-t-rpc.noders.services:27656
```