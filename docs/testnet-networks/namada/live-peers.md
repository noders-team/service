---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-namada">
# Live Peers
</div>
###### Chain ID: `housefire-cotton.d3c912fee7462` | Current Node Version: `v0.44.1`

## All Live Peers for Namada
Here is a list of 1 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
sed -i 's#persistent_peers = ".*"#persistent_peers = "tcp://d6691dc866be3de0be931d2018e8fdc6a564de20@165.227.42.204:26656"#' $HOME/.local/share/namada/housefire-cotton.d3c912fee7462/config.toml

sudo systemctl restart namadad
sudo journalctl -fu namadad --no-hostname -o cat
```