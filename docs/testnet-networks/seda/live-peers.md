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
Here is a list of 24 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
7c5422dec97aafabb2e1163b0ba50a11ca199635@65.21.28.22:26656,d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:17356,8cfdbb242658a42a108b64bbdff73216df9a8e7d@51.195.61.9:25856,cb75c263cff51a14a4f10694046bb81414d10064@18.171.36.35:26656,a6a6f924bf8a88e2d2d6ace0031e6844951712a9@93.189.30.113:26656,aff078d3ede06d45c8da31ba64a7c8af5fe47989@51.79.79.194:26656,e6df92e2b1d7a1834be434a600ab3e40bf6be5dc@135.181.246.250:3420,2be5ff8c0c3de549a93cce013db7602184eccfe4@51.159.191.177:26656,3983d60c54d6cd2a6056b0e1771bf257e82909da@188.40.66.173:25856,b2693b557e75822c4d02b7344a2d38781ffed780@194.163.135.92:26656,6f17331cc623c92fb2fd6b0d678326c3a3dc0a50@65.108.39.147:25856,0b622f1de6d8af71403e22a86220ec6a55ce2e41@80.79.6.202:56656,0660466dfd31d874116cd66ca24f284e9e2b4e62@65.21.32.200:44656,8c26be673af6909fc420cbea7790c0725967c2e4@142.132.154.53:25856,3c0f99a396aaeb69bfe80ea32ac098f5c698660a@194.163.145.61:26656,9fea602250622eaf3c3bcde89db561deb7fa54b3@104.244.208.246:25856,d54409abe78e35bf33a869514bf91187a5d9c5a7@167.235.178.134:25856,e5af5f5c2650fb13da1c661460e72186face79be@95.217.35.179:25856,c9c0a287696e7fd066d8d156d5693ea7e7416221@185.84.224.125:25856,1c3e338b82bc8ca81e7625609e9f8ef583963143@65.108.105.48:25856,9b6de59e38faa31ac0f2ae2469954be562fc167f@13.41.125.154:26656,77aaab9f17ed63de4a774334912126f86bad2ca1@116.96.46.227:26656,e907f34e2677bc10009a15dea55124f23b0776bb@198.244.254.16:26656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@176.9.82.221:25856
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=8cfdbb242658a42a108b64bbdff73216df9a8e7d@51.195.61.9:25856,3983d60c54d6cd2a6056b0e1771bf257e82909da@188.40.66.173:25856,9fea602250622eaf3c3bcde89db561deb7fa54b3@104.244.208.246:25856,b2693b557e75822c4d02b7344a2d38781ffed780@194.163.135.92:26656,9b6de59e38faa31ac0f2ae2469954be562fc167f@13.41.125.154:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.sedad/config/config.toml

sudo systemctl restart sedad
sudo journalctl -fu sedad --no-hostname -o cat
```

## Our peer for Seda
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
3bae0d27a2e2889ebcc4c84918dda1df950ec694@seda-t-rpc.noders.services:24656
```
