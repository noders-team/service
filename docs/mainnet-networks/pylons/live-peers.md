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
Here is a list of 19 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
d6bf1201b9ee8e9d1704ac43915e21756e7229b4@65.109.70.100:26686,c0a3c6c63930d37e4d3497bb159849d7667849cc@65.108.238.215:27456,252a2a9ddb4f30632e274447b4a37606c340742f@65.109.229.209:26656,b19931378a33384fb6ac004d7e55b494031504ae@65.108.140.109:44656,3336e645081fcddb72917c017ae232fa6b7c8cf4@149.50.96.170:26656,0496369603c974b14c612f4bdaf63c671340a108@109.205.182.224:37656,f107788139a878c013e9cf580f3747961e92cfde@95.216.92.229:26656,d2e4037ef5cdf9c13cda663bdc238bf8822e9e81@65.108.129.239:26656,e536c69a1ea332c8242a4178cf4f1a125bf08ee8@65.108.200.61:11224,fb181add2c43b9f4c283eb171dafc94fd7b56b07@78.46.109.138:22656,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,73a9b52cab5e2132c8b685918b6daa4a658477cc@65.109.71.35:28656,57f67656b255c663e8307855ee8e1611845a2e5f@176.9.92.135:60856,5eb57ba49c53dd6269e5afa9062265b0227886e5@144.76.45.59:26156,eafc1b2004058dbba696ca82ddafae19831e1817@89.116.27.24:27156,6144bf581d89212bf294de31e66f94d628f09053@65.109.92.235:38656,e55c36e7ce120599701b14532c864bec57d4477b@161.97.132.66:26656,71b2ccc335a2ed88854444d23c2f2e2fd343c7e9@65.109.52.156:9656,9aa8a73ea9364aa3cf7806d4dd25b6aed88d8152@138.201.220.51:10956
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d6bf1201b9ee8e9d1704ac43915e21756e7229b4@65.109.70.100:26686,6144bf581d89212bf294de31e66f94d628f09053@65.109.92.235:38656,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,5eb57ba49c53dd6269e5afa9062265b0227886e5@144.76.45.59:26156,71b2ccc335a2ed88854444d23c2f2e2fd343c7e9@65.109.52.156:9656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.pylonsd/config/config.toml

sudo systemctl restart pylons.service
sudo journalctl -fu pylons.service --no-hostname -o cat
```

## Our peer for Pylons
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
ae94eb20e73c0ad93dbb980338eb313320c56194@pylons-rpc.noders.services:23656
```