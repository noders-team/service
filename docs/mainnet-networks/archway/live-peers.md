---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-archway">
# Live Peers
</div>
###### Chain ID: `archway-1` | Current Node Version: `v6.0.2`

## All Live Peers for Archway
Here is a list of 30 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
239c647af7b05b0348c187a8e43c3dc3e68fbd82@65.21.96.69:27056,7f96e914690b1a05c028cd9ffe732838ae8ed7c4@65.109.155.80:21656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:15656,59fa569a2446e5e9e1f2181bfc7cd240b2dc595d@44.214.37.79:26656,bd9332cd0a99f5830ea457a32a56b32790f68716@135.181.58.28:27456,80a947787f6d13d00d54c29311dd2dead564f991@62.84.113.139:26656,f2f65d215f529190e0d4fa99e88bfd095c6c5be8@135.181.138.95:2100,f97a5c4779a46b717a1b6c017c372bcb7cc1469c@65.109.117.102:26656,a08ac3979aa3ae1bcfe5a80438477e1592cf29ae@51.210.209.49:15602,17c579988684ca167be22c59a0719715cb038422@5.9.100.26:3000,34999776ce08cb4298a9849609c4b43c78e8be37@65.108.238.203:25656,261acb73f483d1cace653cb54f7b8815f63b7e56@54.36.227.1:26656,68cac650b02d5f62fa1365cff979da7977abea26@65.109.33.48:26656,49aa4097ae141c54816e42159af23290f2b26119@142.132.248.138:26816,6bda0643f60812dac90dfa789dbb509d3a652e8d@156.67.62.27:11556,ac89d74a5903b0cf4ff2304e94f46e82af22651c@2001:26656,7d6c38e2ade98b181f0dfb98ac43cd83e3409d32@54.39.28.226:11556,a195b2b4fd59f3c20ac0eb22eb821720ed161586@88.198.239.154:26662,940ff138bb2abe8284c485c31e8377d69ae4138b@65.21.29.228:11556,0eaaea39348aa6ebd0282e0dc7170b23c3588672@51.89.42.38:26656,6fc97bddf8d5323bd9938e26db8d6d4a53de6855@3.252.72.237:26656,9d6676b51c1be62f0d20c3083ee054ca06779793@103.180.28.100:26656,4cb619bf7aad1da2dea6a929904f810bc057f467@194.36.145.127:26656,d66995c2ec5484af88f15fa484186b004dfc23b0@185.246.87.129:26666,c3911d67cd2147454f007c879f384e12427578ba@136.38.55.33:26656,a81667d4ed0352d63f9c7a697cf5647a3c115de1@15.235.115.152:10100,88043b9df749f172def53d7783c7e378f3eae0eb@174.138.166.133:53656,c1018eb4dd7effbbd3d8dde6e54f569fc7f8bf91@78.46.103.246:61856,6ccbd12710c67de8642cf1a7f545537b6e3e5e66@65.108.121.227:29656,32c8f4217bc1a5fa13e61b6c7c1107a76e3798f1@104.128.62.172:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=940ff138bb2abe8284c485c31e8377d69ae4138b@65.21.29.228:11556,a08ac3979aa3ae1bcfe5a80438477e1592cf29ae@51.210.209.49:15602,80a947787f6d13d00d54c29311dd2dead564f991@62.84.113.139:26656,59fa569a2446e5e9e1f2181bfc7cd240b2dc595d@44.214.37.79:26656,c1018eb4dd7effbbd3d8dde6e54f569fc7f8bf91@78.46.103.246:61856
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.archwayd/config/config.toml

sudo systemctl restart archway.service
sudo journalctl -fu archway.service --no-hostname -o cat
```

## Our peer for Archway
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
c4b36b605667e3896eb6f57c5d731519b89dfc6f@archway-rpc.noders.services:13656
```