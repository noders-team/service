---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-gitopia">
# Live Peers
</div>
###### Chain ID: `gitopia` | Current Node Version: `v3.3.0`

## All Live Peers for Gitopia
Here is a list of 25 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
216f7277bdf853dc8004712aeac0d4f336cc8820@65.108.229.93:27656,d9997dc1938517eef9b8af8aa0c3d7c5d33ae738@65.109.112.170:32656,d1ff97d63ee7410f48de96d1e33431354093ccbb@2a01:26656,d403bb3374090771e33c875e6a3cbcc364e9005e@95.217.121.247:26656,9215fcbf81f6a194cec7373a367f7ccff344a3ef@135.181.208.166:26656,84d092659a4e1f64a3253df42393c50be0dde22d@65.109.16.125:26656,aa26aa0baa5dfc41c126d16d4dc48bb45151d560@65.109.33.48:22656,a2d725392ea4cb4d596555bb6e56a073d140037b@194.163.171.231:26656,d36d88508bc7cb0ed74ae06d8d1a0d23da67862b@142.132.199.236:32656,16742ff69cd65ae56434bb6e44e015ee4e1ac15d@5.9.106.214:26696,049cd2ad34464d4934adac2adec699f722ccab47@185.246.86.44:26656,c92126f30a521af724c175cceade70b5344c56f5@213.246.45.16:33656,e51c3c1bd3d1b8251b83b3d56d1de0c70d617f71@148.113.162.234:21456,6f9f729f2d4a9c3cbab3130157f5200a61bbb273@66.45.246.166:51056,685a4636250629e7a208d7f6afcde5cce0c3854b@131.153.202.85:26656,e632f84030f07357ef7d0d327ded721e3aad4e24@139.99.131.163:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:14156,73ef1c0f9bc77fd925decf7fa41f22a35b5dc76d@185.38.19.3:26627,df7111e93a4503c23ad6b8731ef4fd055280155f@35.240.242.57:26656,3574f2919970f69aa0d0d5100e0d052d69129a75@5.189.173.229:26656,7324256048dd091bb1905b4bcda888d79d3592c5@103.180.28.90:26656,c8db30daf5429c90361add78d985032302e7f2ba@136.243.104.103:10856,a0b6c89b4fe0f455a027080103bffd001f3b6248@65.21.134.202:26356,8e42db619abe34afe8cb39d4a2d04ae5db5bdaaf@162.55.81.201:26656,babc3f3f7804933265ec9c40ad94f4da8e9e0017@38.146.3.100:11356
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=73ef1c0f9bc77fd925decf7fa41f22a35b5dc76d@185.38.19.3:26627,84d092659a4e1f64a3253df42393c50be0dde22d@65.109.16.125:26656,8e42db619abe34afe8cb39d4a2d04ae5db5bdaaf@162.55.81.201:26656,df7111e93a4503c23ad6b8731ef4fd055280155f@35.240.242.57:26656,6f9f729f2d4a9c3cbab3130157f5200a61bbb273@66.45.246.166:51056
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.gitopia/config/config.toml

sudo systemctl restart gitopiad.service
sudo journalctl -fu gitopiad.service --no-hostname -o cat
```

## Our peer for Gitopia
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
8bd48e54552f091c1d8f194515754ab6ed74f054@gitopia-rpc.noders.services:19656
```