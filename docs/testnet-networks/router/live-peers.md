---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-router">
# Live Peers
</div>
###### Chain ID: `router_9601-1` | Current Node Version: `v1.0.0-rc1`

## All Live Peers for Rrouter
Here is a list of 18 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
81635a5f7747441738fd0aa66ce07b7b0f2a76ba@65.108.192.123:17656,f690403b080ad9a710f0f2ab6a865f5d68000814@85.10.204.243:26656,7ea2bdca1d456875fe40c3647c962f651462cc18@176.9.125.120:26656,2220c1ab3a11f945589b74a1ac7538621540f5fd@148.251.2.19:55816,894bc87a92b07d98aa45b1bc043227717feafa93@51.250.98.207:26656,89ec0f07f0ccb61ec19fb8256043cf92e73abd2b@15.206.157.168:26656,dbcba835b674b4a3836b6248b53c0cb5b377957e@136.243.88.91:3100,ccc7e63ac9573b6a28574827b80fa7af67b6bbe4@206.125.34.196:26656,9e553cda456b113bcbd2d6fd2c0d7ea07a78aea0@95.217.43.26:26656,18a0cdb43ae6a8f8309b6e94f1e197cc1e6c4018@116.202.162.188:26656,413126b2acd74822b06415774884c57d7cbd801b@65.109.158.190:22656,23fa9cc299a1ab5b0c09ddeddf83620500778cd1@37.60.245.186:26656,d6a1ca2aa9225d92b2eeff924cb8970da1c39484@136.243.131.108:26656,3df6cb2db301288c492f9ace1b88360e0504b15a@13.235.115.79:26656,89083e1bfa7f72714253f319c2f95eb2a82c5016@136.243.104.103:21456,3bad07f33e5cf5bd1ad87f8ad7a08a7416c7bf38@88.198.8.79:3740,50dc3cca9f3b3f969b812e5760bcaf652aaecc01@43.205.136.8:26656,e02e8264d0bd4e3b3887223f5a5e10d564ed4a11@199.254.199.75:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=89ec0f07f0ccb61ec19fb8256043cf92e73abd2b@15.206.157.168:26656,18a0cdb43ae6a8f8309b6e94f1e197cc1e6c4018@116.202.162.188:26656,81635a5f7747441738fd0aa66ce07b7b0f2a76ba@65.108.192.123:17656,89083e1bfa7f72714253f319c2f95eb2a82c5016@136.243.104.103:21456,3df6cb2db301288c492f9ace1b88360e0504b15a@13.235.115.79:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.routerd/config/config.toml

sudo systemctl restart routerd
sudo journalctl -fu routerd --no-hostname -o cat
```

## Our peer for Rrouter
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
a3f0955784de782dc3cc40cc559c8c0c79bfce3e@router-t-rpc.noders.services:22656
```
