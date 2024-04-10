---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-alignedlayer">
# Live Peers
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `v0.1.0`

## All Live Peers for Alignedlayer
Here is a list of 25 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
75381c12a4ca40dc1abfe0054319f710c5a034ac@91.107.229.176:26656,0fca37648b94cdab49242efda2971b7ae1ffa7da@194.163.145.210:26656,1b0e25af9021cbcb8d804cb74c66f88131e23486@149.50.101.10:12656,476376ddfabce28b99ddbd7840bdc286788a328a@138.201.54.50:26656,d450305fb5b41c35ed6a16bca8539cc0d936d1d7@109.199.100.228:26656,19a5d026913e3d856f19aabf0474f76c94220231@5.189.152.177:26656,d43c2798e02d9bc7ecf6da617323f58ab6aaa2cd@213.199.38.119:26656,d64232a936e55a669b209417c9ecf8c45de2f2f2@172.252.77.88:26656,45d9986c4f0af4c9949c81ca5c24bb2d68338dff@173.249.4.103:26656,5f0b45e26b7147605532c054cb6bcb093f667333@185.148.242.48:26656,836adfdfa7b305ea39ee407711bd6120937e2f28@209.126.83.241:26656,9a8aa5cebc5183c2cba97252c452eab4aba3a6be@213.199.57.46:26656,41286d2ed4dcf1d67d1bac395f50d9ebab91a1b7@88.198.27.51:60556,4e04a3ddeabaf50902b36246aca65c4700f9e97f@173.249.39.87:24256,e0bb89a2fa300cf1e873d1dc460350a8b0582018@38.242.246.161:26656,832da428e76fe3705573b5c1d490e8d9587f3b91@63.141.255.7:26656,592259c5d9295252d2dc9662752553b783faa733@193.46.243.230:26656,6dfa16801cbb413b8245e817e1a429783ee1f014@207.180.219.57:26656,a4fc7e6bbd94f14a26ad0613dc62efcd637130e1@43.128.96.49:26656,1c29f2ce64cc4f54e63de1c43f89b8259a8ae029@64.44.24.203:26656,e8a166db33e834db9f9590be5feb1540e947913b@52.184.164.223:26656,90295bf5f4f7aea8b1b8f892eda5d9f972bb8a21@185.148.242.14:26656,f9ecfb7f72724ab9c12e2e4d711ff60247fefdd2@37.60.225.117:26656,acac053fb810bbe2ad56d8cdef796c8c7de5b139@95.216.162.26:26656,c355b86c882d05a83f84afba379291d7b954b28f@65.108.236.43:21256
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=6dfa16801cbb413b8245e817e1a429783ee1f014@207.180.219.57:26656,e0bb89a2fa300cf1e873d1dc460350a8b0582018@38.242.246.161:26656,90295bf5f4f7aea8b1b8f892eda5d9f972bb8a21@185.148.242.14:26656,41286d2ed4dcf1d67d1bac395f50d9ebab91a1b7@88.198.27.51:60556,d64232a936e55a669b209417c9ecf8c45de2f2f2@172.252.77.88:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.alignedlayer/config/config.toml

sudo systemctl restart alignedlayerd.service
sudo journalctl -fu alignedlayerd.service --no-hostname -o cat
```

## Our peer for Alignedlayer
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
b5da413b7882dc42172818914f55e661fcb88981@aligned-t-rpc.noders.services:27656
```