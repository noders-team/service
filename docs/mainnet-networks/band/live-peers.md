---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-band">
# Live Peers
</div>
###### Chain ID: `` | Current Node Version: `v2.5.4`

## All Live Peers for Band
Here is a list of 4 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
8ce6fbbff20edcc17c6dbf4ef282857336ba6bcf@2a01:12956,03d8998530017c29e57f1d164c556e28ff48e710@65.108.76.28:22956,268c44707b65471851e70c26d00c8ec9261c15a4@65.108.122.246:26646,7ff95d67cb57b44eba11bed8f3a157eb42bf8311@153.139.245.107:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=7ff95d67cb57b44eba11bed8f3a157eb42bf8311@153.139.245.107:26656,03d8998530017c29e57f1d164c556e28ff48e710@65.108.76.28:22956,8ce6fbbff20edcc17c6dbf4ef282857336ba6bcf@2a01:12956,268c44707b65471851e70c26d00c8ec9261c15a4@65.108.122.246:26646
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.band/config/config.toml

sudo systemctl restart bandd
sudo journalctl -fu bandd --no-hostname -o cat
```

## Our peer for Band
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
@band-rpc.noders.services:
```
