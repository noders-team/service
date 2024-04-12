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
fb181add2c43b9f4c283eb171dafc94fd7b56b07@78.46.109.138:22656,0496369603c974b14c612f4bdaf63c671340a108@109.205.182.224:37656,030e6a01aef8913bcee33b957e9204986203bc81@135.125.4.73:46656,f107788139a878c013e9cf580f3747961e92cfde@95.216.92.229:26656,f70362641526cdc1036240c53e50f3aacd31abb2@195.3.220.169:26636,e536c69a1ea332c8242a4178cf4f1a125bf08ee8@65.108.200.61:11224,d2e4037ef5cdf9c13cda663bdc238bf8822e9e81@65.108.129.239:26656,cf59d7fb9154e77203a7f8b8126a8aedd0f181f8@65.108.135.211:46656,57f67656b255c663e8307855ee8e1611845a2e5f@176.9.92.135:60856,3c3dd9b334bcc9b6edaee345ff1b62be65b803e0@148.113.162.234:26656,88842d9e1b2e95cdd95227ae6d952b0fa6290737@84.16.241.18:29656,988d088c61a7cbf458304971ebb0d5cd1d6c08d0@142.132.156.99:20256,eafc1b2004058dbba696ca82ddafae19831e1817@89.116.27.24:27156,dcd20401417eabeec46297be26c93e2e0b3f029d@5.161.229.9:26656,e55c36e7ce120599701b14532c864bec57d4477b@161.97.132.66:26656,71b2ccc335a2ed88854444d23c2f2e2fd343c7e9@65.109.52.156:9656,73a9b52cab5e2132c8b685918b6daa4a658477cc@65.109.71.35:28656,e9e64412c3d43de4f2e5f7a3e9289b4190e4ed78@88.198.32.17:33656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=71b2ccc335a2ed88854444d23c2f2e2fd343c7e9@65.109.52.156:9656,cf59d7fb9154e77203a7f8b8126a8aedd0f181f8@65.108.135.211:46656,030e6a01aef8913bcee33b957e9204986203bc81@135.125.4.73:46656,f70362641526cdc1036240c53e50f3aacd31abb2@195.3.220.169:26636,e536c69a1ea332c8242a4178cf4f1a125bf08ee8@65.108.200.61:11224
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.pylonsd/config/config.toml

sudo systemctl restart pylonsd
sudo journalctl -fu pylonsd --no-hostname -o cat
```

## Our peer for Pylons
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
ae94eb20e73c0ad93dbb980338eb313320c56194@pylons-rpc.noders.services:23656
```
