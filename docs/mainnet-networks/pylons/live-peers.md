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
Here is a list of 18 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
2fbafcad63eefd2053135061682042e803f8cf0b@65.109.109.225:26656,85e236a129337efe946c6a68ee72a6da87825bc5@65.109.92.240:20256,19bd42c383fc38920ff6c82a351a8a6284199466@65.108.199.26:16656,c0a3c6c63930d37e4d3497bb159849d7667849cc@65.108.238.215:27456,e536c69a1ea332c8242a4178cf4f1a125bf08ee8@65.108.200.61:11224,f70362641526cdc1036240c53e50f3aacd31abb2@195.3.220.169:26636,f107788139a878c013e9cf580f3747961e92cfde@95.216.92.229:26656,030e6a01aef8913bcee33b957e9204986203bc81@135.125.4.73:46656,fb181add2c43b9f4c283eb171dafc94fd7b56b07@78.46.109.138:22656,af4cc3ce89e51b9d99c46496daec60e2cdf2143b@65.108.126.49:27656,57f67656b255c663e8307855ee8e1611845a2e5f@176.9.92.135:60856,b19931378a33384fb6ac004d7e55b494031504ae@65.108.140.109:44656,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,eafc1b2004058dbba696ca82ddafae19831e1817@89.116.27.24:27156,d2e4037ef5cdf9c13cda663bdc238bf8822e9e81@65.108.129.239:26656,dcd20401417eabeec46297be26c93e2e0b3f029d@5.161.229.9:26656,3336e645081fcddb72917c017ae232fa6b7c8cf4@149.50.96.170:26656,9aa8a73ea9364aa3cf7806d4dd25b6aed88d8152@138.201.220.51:10956
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=dcd20401417eabeec46297be26c93e2e0b3f029d@5.161.229.9:26656,85e236a129337efe946c6a68ee72a6da87825bc5@65.109.92.240:20256,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,2fbafcad63eefd2053135061682042e803f8cf0b@65.109.109.225:26656,f107788139a878c013e9cf580f3747961e92cfde@95.216.92.229:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.pylonsd/config/config.toml

sudo systemctl restart pylons.service
sudo journalctl -fu pylons.service --no-hostname -o cat
```

## Our peer for Pylons
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
ae94eb20e73c0ad93dbb980338eb313320c56194@pylons-rpc.noders.services:23656
```