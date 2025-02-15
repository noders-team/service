---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# Live Peers
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[VERSION]`

## All Live Peers for [CHAIN_NAME]
Here is a list of [LIVE_PEERS_COUNT] active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
[LIVE_PEERS_ALL]
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=[LIVE_PEERS_RANDOM]
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" [DAEMON_HOME]/config/config.toml

sudo systemctl restart [DAEMON_NAME]
sudo journalctl -fu [DAEMON_NAME] --no-hostname -o cat
```

## Our peer for [CHAIN_NAME]
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
[ENDPOINT_PEER]
```