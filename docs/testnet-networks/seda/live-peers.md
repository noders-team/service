---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-seda">
# Live Peers
</div>
###### Chain ID: `seda-1-testnet` | Current Node Version: `v0.0.7`

## All Live Peers for Seda
Here is a list of 26 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
510060581212de0892703dd1c2f894baefb13a32@65.21.88.86:26656,3c0f99a396aaeb69bfe80ea32ac098f5c698660a@194.163.145.61:26656,cb75c263cff51a14a4f10694046bb81414d10064@18.171.36.35:26656,d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:17356,b2693b557e75822c4d02b7344a2d38781ffed780@194.163.135.92:26656,8cfdbb242658a42a108b64bbdff73216df9a8e7d@51.195.61.9:25856,9fea602250622eaf3c3bcde89db561deb7fa54b3@104.244.208.246:25856,2be5ff8c0c3de549a93cce013db7602184eccfe4@51.159.191.177:26656,6f17331cc623c92fb2fd6b0d678326c3a3dc0a50@65.108.39.147:25856,0660466dfd31d874116cd66ca24f284e9e2b4e62@65.21.32.200:44656,e5af5f5c2650fb13da1c661460e72186face79be@95.217.35.179:25856,3983d60c54d6cd2a6056b0e1771bf257e82909da@188.40.66.173:25856,8c26be673af6909fc420cbea7790c0725967c2e4@142.132.154.53:25856,8f6ee9732ea5552dda6adbefa6a55e25bd3f4b89@211.219.19.141:27656,9b6de59e38faa31ac0f2ae2469954be562fc167f@13.41.125.154:26656,a6a6f924bf8a88e2d2d6ace0031e6844951712a9@93.189.30.113:26656,e6df92e2b1d7a1834be434a600ab3e40bf6be5dc@135.181.246.250:3420,6952407c2c62b3193e4eadf6d7562fc4288b4e10@95.217.16.83:17356,82a5a3900d99d2e9e57343e900576e770cd78d5f@109.199.127.16:25856,c9c0a287696e7fd066d8d156d5693ea7e7416221@185.84.224.125:25856,0b622f1de6d8af71403e22a86220ec6a55ce2e41@80.79.6.202:56656,3da2316011d98adc484d1582ccee563edda6fe8f@2a01:26656,d54409abe78e35bf33a869514bf91187a5d9c5a7@167.235.178.134:25856,1c3e338b82bc8ca81e7625609e9f8ef583963143@65.108.105.48:25856,b6a3ec749d60475328ec13fd72e5515da6139a00@65.21.196.187:18656,a98484ac9cb8235bd6a65cdf7648107e3d14dab4@116.202.231.58:17356
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=0b622f1de6d8af71403e22a86220ec6a55ce2e41@80.79.6.202:56656,3da2316011d98adc484d1582ccee563edda6fe8f@2a01:26656,c9c0a287696e7fd066d8d156d5693ea7e7416221@185.84.224.125:25856,a98484ac9cb8235bd6a65cdf7648107e3d14dab4@116.202.231.58:17356,a6a6f924bf8a88e2d2d6ace0031e6844951712a9@93.189.30.113:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.sedad/config/config.toml

sudo systemctl restart seda.service
sudo journalctl -fu seda.service --no-hostname -o cat
```

## Our peer for Seda
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
3bae0d27a2e2889ebcc4c84918dda1df950ec694@seda-t-rpc.noders.services:24656
```