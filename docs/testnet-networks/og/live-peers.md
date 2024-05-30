---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-og">
# Live Peers
</div>
###### Chain ID: `zgtendermint_16600-1` | Current Node Version: `v0.1.0`

## All Live Peers for ZeroGravity
Here is a list of 11 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
bcc742541da5777853e1630603dab6dd36afbd43@138.201.225.96:26656,2e432f2309bc22547a7beadeb8c7007490e95479@161.97.168.245:26656,66a25d8c4b6de583762d02def6e4d0f913f66ffa@15.235.144.20:47656,6dd8547d5496004f01fb985a8c6621ab1e5b777e@65.109.153.225:26656,11338766d94c9b5fdec3382e215c8eeb1c11d8a2@81.17.100.78:33556,ad0a987b78c372f49d7b8a7ebded95c82c205164@116.202.162.188:14656,47149b7fdd2e6eca13311dd848fff186f41d8619@173.212.203.7:12656,9c51400f0ff576e5be986335c9c8a5e36bb592f3@154.12.226.180:26656,c9670509236d226d10368bbc41cdccf8630a82a5@156.67.81.42:26656,75d84f25f75f2f25879ee01b4fac16734d46ae05@176.57.189.36:11656,9f341ec6988c1f541dfdc83d6dc1badd4849255f@37.27.120.90:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=6dd8547d5496004f01fb985a8c6621ab1e5b777e@65.109.153.225:26656,9c51400f0ff576e5be986335c9c8a5e36bb592f3@154.12.226.180:26656,47149b7fdd2e6eca13311dd848fff186f41d8619@173.212.203.7:12656,bcc742541da5777853e1630603dab6dd36afbd43@138.201.225.96:26656,ad0a987b78c372f49d7b8a7ebded95c82c205164@116.202.162.188:14656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.evmosd/config/config.toml

sudo systemctl restart evmosd
sudo journalctl -fu evmosd --no-hostname -o cat
```

## Our peer for ZeroGravity
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
986ff891360c0c1c5ead8cf498383e832e34ca89@og-t-rpc.noders.services:29656
```
