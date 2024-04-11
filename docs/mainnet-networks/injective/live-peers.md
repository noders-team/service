---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-injective">
# Live Peers
</div>
###### Chain ID: `injective-1` | Current Node Version: `vnull`

## All Live Peers for Injective
Here is a list of 27 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
23a6ed116533fc5a39e817b76a4d1c821e5d7ff9@193.84.3.32:14356,858c86e2590f82934b8483ed184afd88416a7b31@135.181.113.227:2106,8f5603be95562a7c177a2395cb842e72390f7e7e@51.159.0.48:26656,db1c47a8b178410702dc03ca202f04246e21230b@65.109.36.70:26656,8682d5a13552831a20f327d39b71c6b8aa957f5a@51.91.214.230:26656,1cbf3a63ff99f6557cd0b9feb207a7c987832cfa@198.244.165.175:13656,204bd049353264547978853a8efb32e4521d8816@57.128.133.25:26656,61c88918832b352a1a930f56fc720890187411e6@116.202.234.242:26656,a6c66d5db62d6359179c30c7dc3836fa8d60d348@148.113.162.70:12200,3519a502a9701fd08b0470ec509dfb234b8cbd4f@54.245.60.120:26656,eea48a4fc4f0257e30843c8bfe296aa0bb61e5ae@51.159.0.207:16656,a7bf47bf83b12c6744d1f8a1b944947b12330404@65.108.230.84:26656,5f05920f25fcd2524940be3bdb048f01d6bb0a53@46.4.164.217:26656,b335c4cd6c527c065503607c48abf5a2f62d2b51@15.235.114.80:11751,27bc6d3cde19ae5b18713d2ea903d9530461393f@2a01:26656,f035154b27de1a02be9972a7802f508f97bed33d@18.180.211.28:26656,508ce50b613d995aaf63da0ea932aaf38dd5f5be@162.62.233.214:26656,9b4291ebc53fd38f45615cb39f1b40c6636b7d62@65.108.7.249:14356,975547fcec7794dadbe311016aaac094d6fb69c7@169.155.169.75:26656,045a8f4b0fd3982e74bcbcf8374c7a498b8703d1@35.161.85.155:26656,67e4cb969b462b08a326a709f67f13d6de4b1f6d@65.21.10.181:14356,ec80c0874742cae0efb1a0edecf3cf3cbe777027@38.58.182.13:26656,1e076da3bcab878589e774e167d2b935d48373a0@3.217.47.126:26656,51d8c3d8a39df5ff45b1c28d9e7169b6766ac71c@44.214.37.79:26656,eef279a2364f86401f9086f0dffb9047202fe95f@43.130.233.191:26656,7f3473ddab10322b63789acb4ac58647929111ba@15.235.13.116:11751,d8fa03360014d47dc2ed1fa930b0922a6efc7f27@135.125.189.156:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=1e076da3bcab878589e774e167d2b935d48373a0@3.217.47.126:26656,858c86e2590f82934b8483ed184afd88416a7b31@135.181.113.227:2106,23a6ed116533fc5a39e817b76a4d1c821e5d7ff9@193.84.3.32:14356,27bc6d3cde19ae5b18713d2ea903d9530461393f@2a01:26656,045a8f4b0fd3982e74bcbcf8374c7a498b8703d1@35.161.85.155:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.injectived/config/config.toml

sudo systemctl restart injectived.service
sudo journalctl -fu injectived.service --no-hostname -o cat
```

## Our peer for Injective
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
b96ce37010e0b3baa5020b536822ccba511c8f5f@injective-rpc.noders.services:33656
```