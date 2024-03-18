---
hide_table_of_contents: false
title: Live peers*
sidebar_position: 5
---

<div class="h1-with-icon icon-osmosis">
# Live Peers
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

## All Live Peers for Osmosis
Here is a list of [LIVE_PEERS_COUNT] active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
[LIVE_PEERS_ALL]
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=[LIVE_PEERS_RANDOM]
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.osmosisd/config/config.toml

sudo systemctl restart osmosisd.service
sudo journalctl -fu osmosisd.service --no-hostname -o cat
```

## Ours Peer for Osmosis
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
91570c5f4e2a54ce53996475aea4f530e0669a2e@osmosis.rpc.mainnet.noders.team:10656
```