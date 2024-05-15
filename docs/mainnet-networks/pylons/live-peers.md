---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-pylons">
# Live Peers
</div>
###### Chain ID: `pylons-mainnet-1` | Current Node Version: `v1.1.4`

## All Live Peers for Pylons
Here is a list of 17 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
cf59d7fb9154e77203a7f8b8126a8aedd0f181f8@65.108.135.211:46656,c0a3c6c63930d37e4d3497bb159849d7667849cc@65.108.238.215:27456,5eb57ba49c53dd6269e5afa9062265b0227886e5@144.76.45.59:26156,dcd20401417eabeec46297be26c93e2e0b3f029d@5.161.229.9:26656,988d088c61a7cbf458304971ebb0d5cd1d6c08d0@142.132.156.99:20256,eafc1b2004058dbba696ca82ddafae19831e1817@89.116.27.24:27156,e536c69a1ea332c8242a4178cf4f1a125bf08ee8@65.108.200.61:11224,f107788139a878c013e9cf580f3747961e92cfde@95.216.92.229:26656,d6bf1201b9ee8e9d1704ac43915e21756e7229b4@65.109.70.100:26686,57f67656b255c663e8307855ee8e1611845a2e5f@176.9.92.135:60856,fb181add2c43b9f4c283eb171dafc94fd7b56b07@78.46.109.138:22656,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,d0769a0e7fa1fc86baa0b2b9e9c6d9f7ba2dd2b6@46.4.23.108:36656,6144bf581d89212bf294de31e66f94d628f09053@65.109.92.235:38656,d2e4037ef5cdf9c13cda663bdc238bf8822e9e81@65.108.129.239:26656,0496369603c974b14c612f4bdaf63c671340a108@109.205.182.224:37656,d453fb5fd0e344d69fc0ed8126da5e10f5f6fa1b@75.119.155.250:28656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=57f67656b255c663e8307855ee8e1611845a2e5f@176.9.92.135:60856,eafc1b2004058dbba696ca82ddafae19831e1817@89.116.27.24:27156,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,f107788139a878c013e9cf580f3747961e92cfde@95.216.92.229:26656,d6bf1201b9ee8e9d1704ac43915e21756e7229b4@65.109.70.100:26686
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.pylonsd/config/config.toml

sudo systemctl restart pylonsd
sudo journalctl -fu pylonsd --no-hostname -o cat
```

## Our peer for Pylons
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
ae94eb20e73c0ad93dbb980338eb313320c56194@pylons-rpc.noders.services:23656
```
