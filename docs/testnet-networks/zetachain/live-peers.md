---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-zetachain">
# Live Peers
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

## All Live Peers for Zetachain
Here is a list of 1 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash

```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.zetacored/config/config.toml

sudo systemctl restart zetacored
sudo journalctl -fu zetacored --no-hostname -o cat
```

## Our peer for Zetachain
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
@zetachain-t-rpc.noders.services:
```