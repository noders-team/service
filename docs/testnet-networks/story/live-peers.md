---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-story">
# Live Peers
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

## All Live Peers for Story
Here is a list of 10 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
e253e62e6020e7332d260b698dd11079daffeebc@37.27.127.145:42656,b8e19cff36a588977a55f993132f5a2d304ae3bf@212.47.65.52:26656,5c001659b68370e7198e9c6c72bfc4c3c15dba41@211.218.55.32:50656,b954afe1c26b82cf0628642c82ffee13e108387d@165.154.225.142:26656,e8317a671abf0af33eb712045f368ac5f335d690@2.56.246.4:18656,6adbd1e974d6bb1c353aabbc7abef72c81e536f5@44.235.196.208:26656,a4f0d9f44b56dcc8f98a714e8efcd87ac71c6652@65.109.26.242:25556,1b6637e4c7cc1c0d85ddb20c66d2382b66ea6e92@95.216.12.106:41656,396710d357b98220bc5f9c4d11c56392db631c30@161.97.174.80:21656,47fcc3c2e854926f1e688a3a42415764aab726a8@185.236.234.148:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=47fcc3c2e854926f1e688a3a42415764aab726a8@185.236.234.148:26656,b8e19cff36a588977a55f993132f5a2d304ae3bf@212.47.65.52:26656,e8317a671abf0af33eb712045f368ac5f335d690@2.56.246.4:18656,5c001659b68370e7198e9c6c72bfc4c3c15dba41@211.218.55.32:50656,a4f0d9f44b56dcc8f98a714e8efcd87ac71c6652@65.109.26.242:25556
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.story/config/config.toml

sudo systemctl restart story
sudo journalctl -fu story --no-hostname -o cat
```

## Our peer for Story
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
@story.rpc.noders.services:
```