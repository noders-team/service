---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-celestia">
# Live Peers
</div>
###### Chain ID: `` | Current Node Version: `v1.9.0`

## All Live Peers for Celestia
Here is a list of 24 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
1ed8174551113f6275c4a914fe20c8a59275fb55@116.202.238.252:26656,900c924eacd891002f2ad2a8721fba188447d3ff@139.59.29.146:26200,9388f26a5ab25de666ecbb4f6c3738e8c73dedd7@141.95.99.111:20014,17015c46a300c2fe31cfb84b3a4af9db18626ff7@13.215.96.206:26656,96ad02edf366f639775806274fa2944fad624966@170.64.148.176:26200,4b90b0842789b7f8676aa3921d51f1ae4f3ca8a1@136.243.88.91:1540,9720064ae57d59c0f4a50db963e4b068f0f29594@136.243.21.50:29656,cf7ac8b19ff56a9d47c75551bd4864883d1e24b5@51.158.66.16:26656,23b88ebcfb2177dbd2d8b2920c363a25e038e69a@89.58.61.213:2000,5e6697b213dfa158b454c4bd2c9e78035b18a3de@80.64.211.215:26656,b4c02d154fc7eb52fbc93fc283b758f12b3060cd@142.132.253.112:26656,00133e62873e724700421d41d4f2f6d24b849bf4@185.111.159.231:2000,ec39096b831861bcda43896d098771fa9587ebce@78.46.103.246:61456,f821569edc91c531f0b424ab43e9a870e1423fbb@161.35.69.39:26200,6de4ce5baa9d2bed33c0c53b9518b907cfaab33b@65.108.128.201:11656,a86cfe5a22e73ff0c9ceec388e9b52bf8355efdd@85.239.233.57:2000,deee84ece18f31efec8f9bc699b2377a4c0c0714@74.118.143.164:26656,62f006684e2628896facc8ca8f35ab989edaf353@51.178.88.49:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.108.233.103:12056,31d28d5bf04bd240808ffb19161a72eb37498646@38.242.140.211:2000,9a179402b03fa08f4b635439a0cd857184c87979@65.21.69.230:26656,b7408d0c59fc0fd0c9153365d5593c6c32870cb0@47.147.226.147:34656,6b89930f5b0f41f19038b04bf9972c61e23cf4b5@46.4.95.67:2000,f103c4809c8263b311463422195e6ad8526911d6@74.118.136.167:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=00133e62873e724700421d41d4f2f6d24b849bf4@185.111.159.231:2000,31d28d5bf04bd240808ffb19161a72eb37498646@38.242.140.211:2000,deee84ece18f31efec8f9bc699b2377a4c0c0714@74.118.143.164:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.108.233.103:12056,4b90b0842789b7f8676aa3921d51f1ae4f3ca8a1@136.243.88.91:1540
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.celestia-app/config/config.toml

sudo systemctl restart celestia-appd
sudo journalctl -fu celestia-appd --no-hostname -o cat
```

## Our peer for Celestia
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
@celestia-rpc.noders.services:
```
