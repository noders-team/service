---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-stratos">
# Live Peers
</div>
###### Chain ID: `stratos-1` | Current Node Version: `v0.12.0`

## All Live Peers for Stratos
Here is a list of 8 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
e3d83aec745604552b82d03263035cdf53dd03da@18.223.196.244:26656,fe91503e4faba6d24da81b176fa45decb2d4334f@65.21.45.173:21856,bc7ed320a3d1e5862deccd96a4fddeb5c82721d2@35.203.182.250:26656,40ad23cca2c8640f5935e00c03bda06acdc54146@35.230.38.120:26656,51db58032c3491cc0f30057721af97ac0a0b76c5@51.89.219.159:41656,3d7e7aa4bfd7cbf4ecd157523b24f82a9ebd13e7@65.21.116.32:26656,01b74112ef2b0c3f7e86754d79524909d6aa32d7@104.36.87.121:26656,f748f27b136b42cf163dd5da678aa809266b2edd@65.109.18.169:21856
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=fe91503e4faba6d24da81b176fa45decb2d4334f@65.21.45.173:21856,bc7ed320a3d1e5862deccd96a4fddeb5c82721d2@35.203.182.250:26656,3d7e7aa4bfd7cbf4ecd157523b24f82a9ebd13e7@65.21.116.32:26656,40ad23cca2c8640f5935e00c03bda06acdc54146@35.230.38.120:26656,51db58032c3491cc0f30057721af97ac0a0b76c5@51.89.219.159:41656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.stchaind/config/config.toml

sudo systemctl restart stchaind
sudo journalctl -fu stchaind --no-hostname -o cat
```

## Our peer for Stratos
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
71f6b523df0c5cbb1995a14e7eac46a9befcad37@stratos-rpc.noders.services:29656
```
