---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-namada">
# Live Peers
</div>
###### Chain ID: `namada.5f5de2dd1b88cba30586420` | Current Node Version: `v1.0.0`

## All Live Peers for Namada
Here is a list of 1 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
sed -i 's#persistent_peers = ".*"#persistent_peers = "tcp://05309c2cce2d163027a47c662066907e89cd6b99@74.50.93.254:26656,tcp://2bf5cdd25975c239e8feb68153d69c5eec004fdb@64.118.250.82:46656"#' $HOME/.local/share/namada/housefire-cotton.d3c912fee7462/config.toml

sudo systemctl restart namadad
sudo journalctl -fu namadad --no-hostname -o cat
```