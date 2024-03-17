---
hide_table_of_contents: false
title: Live peers*
sidebar_position: 5
---

# CHAIN_NAME Live Peers
###### Chain ID: `[CHAIN_ID]` | Binary Version: `${DAEMON_VERSION}`

## All Live Peers for CHAIN_NAME
Here is a list of       29 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
[LIVE_PEERS_ALL]
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=[LIVE_PEERS_RANDOM]
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" [DAEMON_HOME]/config/config.toml

sudo systemctl restart [DAEMON_SERVICE]
sudo journalctl -fu [DAEMON_SERVICE] --no-hostname -o cat
```

## Ours Peer for CHAIN_NAME
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
2e6fb93b12f9cdff3a3cb69db3c93713e69df8f7@65.108.204.225:12556
```