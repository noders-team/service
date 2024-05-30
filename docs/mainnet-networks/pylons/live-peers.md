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
Here is a list of 20 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
2fbafcad63eefd2053135061682042e803f8cf0b@65.109.109.225:26656,19bd42c383fc38920ff6c82a351a8a6284199466@65.108.199.26:16656,dea08fa4f608d954890631468fdf4de3ba1ae103@138.201.225.104:47256,ac927f72c6fd74268202650d123f718ddf4a499c@142.132.158.9:19456,e55c36e7ce120599701b14532c864bec57d4477b@161.97.132.66:26656,988d088c61a7cbf458304971ebb0d5cd1d6c08d0@142.132.156.99:20256,d0769a0e7fa1fc86baa0b2b9e9c6d9f7ba2dd2b6@46.4.23.108:36656,6144bf581d89212bf294de31e66f94d628f09053@65.109.92.235:38656,f107788139a878c013e9cf580f3747961e92cfde@95.216.92.229:26656,fb181add2c43b9f4c283eb171dafc94fd7b56b07@78.46.109.138:22656,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,e536c69a1ea332c8242a4178cf4f1a125bf08ee8@65.108.200.61:11224,e9e64412c3d43de4f2e5f7a3e9289b4190e4ed78@88.198.32.17:33656,dcd20401417eabeec46297be26c93e2e0b3f029d@5.161.229.9:26656,57f67656b255c663e8307855ee8e1611845a2e5f@176.9.92.135:60856,0f606f3fa1290d86e514a22a2b6a96ef4b58c70d@195.201.202.39:26666,88842d9e1b2e95cdd95227ae6d952b0fa6290737@84.16.241.18:29656,eafc1b2004058dbba696ca82ddafae19831e1817@89.116.27.24:27156,030e6a01aef8913bcee33b957e9204986203bc81@135.125.4.73:46656,b19931378a33384fb6ac004d7e55b494031504ae@65.108.140.109:44656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=b19931378a33384fb6ac004d7e55b494031504ae@65.108.140.109:44656,0f606f3fa1290d86e514a22a2b6a96ef4b58c70d@195.201.202.39:26666,dcd20401417eabeec46297be26c93e2e0b3f029d@5.161.229.9:26656,e536c69a1ea332c8242a4178cf4f1a125bf08ee8@65.108.200.61:11224,fb181add2c43b9f4c283eb171dafc94fd7b56b07@78.46.109.138:22656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.pylonsd/config/config.toml

sudo systemctl restart pylonsd
sudo journalctl -fu pylonsd --no-hostname -o cat
```

## Our peer for Pylons
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
ae94eb20e73c0ad93dbb980338eb313320c56194@pylons-rpc.noders.services:23656
```
