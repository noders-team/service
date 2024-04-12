---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-band">
# Live Peers
</div>
###### Chain ID: `` | Current Node Version: `vauto`

## All Live Peers for Band
Here is a list of 3 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
f40730321bbadfbff1dc6235e32652de5cac97d2@65.109.97.249:22956,f613364871e875c240698d1d6b8f83c6c3512389@65.108.238.219:22956,c3594887b3a4b6a7fb2355c8f3a03f50e3510f70@168.119.146.110:25656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=c3594887b3a4b6a7fb2355c8f3a03f50e3510f70@168.119.146.110:25656,f40730321bbadfbff1dc6235e32652de5cac97d2@65.109.97.249:22956,f613364871e875c240698d1d6b8f83c6c3512389@65.108.238.219:22956
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.band/config/config.toml

sudo systemctl restart bandd
sudo journalctl -fu bandd --no-hostname -o cat
```

## Our peer for Band
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
@band-rpc.noders.services:
```
