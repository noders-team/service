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
Here is a list of 23 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
1c3e338b82bc8ca81e7625609e9f8ef583963143@65.108.105.48:25856,e5af5f5c2650fb13da1c661460e72186face79be@95.217.35.179:25856,c9c0a287696e7fd066d8d156d5693ea7e7416221@185.84.224.125:25856,77aaab9f17ed63de4a774334912126f86bad2ca1@116.96.46.227:26656,d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:17356,3983d60c54d6cd2a6056b0e1771bf257e82909da@188.40.66.173:25856,b2693b557e75822c4d02b7344a2d38781ffed780@194.163.135.92:26656,0b622f1de6d8af71403e22a86220ec6a55ce2e41@80.79.6.202:56656,a6a6f924bf8a88e2d2d6ace0031e6844951712a9@93.189.30.113:26656,aff078d3ede06d45c8da31ba64a7c8af5fe47989@51.79.79.194:26656,2be5ff8c0c3de549a93cce013db7602184eccfe4@51.159.191.177:26656,0660466dfd31d874116cd66ca24f284e9e2b4e62@65.21.32.200:44656,d54409abe78e35bf33a869514bf91187a5d9c5a7@167.235.178.134:25856,6f17331cc623c92fb2fd6b0d678326c3a3dc0a50@65.108.39.147:25856,e6df92e2b1d7a1834be434a600ab3e40bf6be5dc@135.181.246.250:3420,e0c75556ddfc5bd5437a06c912806042f2d68622@38.109.200.33:26656,9fea602250622eaf3c3bcde89db561deb7fa54b3@104.244.208.246:25856,8c26be673af6909fc420cbea7790c0725967c2e4@142.132.154.53:25856,cb75c263cff51a14a4f10694046bb81414d10064@18.171.36.35:26656,8cfdbb242658a42a108b64bbdff73216df9a8e7d@51.195.61.9:25856,8f6ee9732ea5552dda6adbefa6a55e25bd3f4b89@211.219.19.141:27656,078ab0e0c768e2d0458a4a70e45e3191dbb422d1@3.120.190.140:26656,cc007eaaf887a25ced3bb01f5ca8112a92b94739@65.21.198.100:23656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:17356,e5af5f5c2650fb13da1c661460e72186face79be@95.217.35.179:25856,0b622f1de6d8af71403e22a86220ec6a55ce2e41@80.79.6.202:56656,cb75c263cff51a14a4f10694046bb81414d10064@18.171.36.35:26656,6f17331cc623c92fb2fd6b0d678326c3a3dc0a50@65.108.39.147:25856
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.sedad/config/config.toml

sudo systemctl restart sedad
sudo journalctl -fu sedad --no-hostname -o cat
```

## Our peer for Seda
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
3bae0d27a2e2889ebcc4c84918dda1df950ec694@seda-t-rpc.noders.services:24656
```
