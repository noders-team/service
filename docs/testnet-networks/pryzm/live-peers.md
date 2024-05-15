---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-pryzm">
# Live Peers
</div>
###### Chain ID: `indigo-1` | Current Node Version: `v0.15.0`

## All Live Peers for Pryzm
Here is a list of 21 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
fe7be8b731041a1d436956af01cbb0db099f2921@213.199.33.90:47656,8e79085bd9aa6ed609e625625952d001e3188f69@65.109.124.51:22656,89f6a47c6befc303e460886e4c4a10039119e961@162.55.87.21:26656,5c2a752c9b1952dbed075c56c600c3a79b58c395@195.3.220.54:27406,6c6845ae96bab5cad4d83f35b7826eca1b92f6d8@38.242.251.5:26656,6bcfcac0921a973ac1f8eab5619fcc9da7de5e27@128.140.89.194:26656,4cfa1292c6b277e04508733cf6ceb8c41cb0b520@2a01:33656,7994dfc6a8d079151f7179d27a47a75554d438eb@89.116.139.8:656,6ad6690b0dd05320f33aac344a2a95e3aaad2b59@62.195.206.235:41656,7c35b2029b29ccb47c386a51b147af7063969b99@2a01:37656,95e0824a20815865d81373616ff8cae75cd3f5e7@174.138.18.79:23256,fbfd48af73cd1f6de7f9102a0086ac63f46fb911@65.108.231.124:41656,e7ed3181007e86fc7962742ba9992f80efe1e3c5@38.80.157.171:23256,2d12c15f19deb4ab13035959d2d1a91d786c4fd2@158.220.103.21:23256,40857badf2da506a30e0b5979a8aa62d61151bb6@109.199.97.208:23256,726c0f29278d7db5957c78852877be160851742a@148.113.1.84:23256,af564b8278f75c50830ffc7321bed5f1b4dd80c9@136.243.104.103:23256,1a3427d369d52977b81a9059245d8d3deb45b073@173.249.26.237:17656,e038a6a05eb99c0015afcaf1584d26ea4b672e67@42.117.155.201:26656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@176.9.82.221:24856,b6274ce5a39b6c66af17550dc3c9e24a5742bdac@102.219.153.216:23256
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=7994dfc6a8d079151f7179d27a47a75554d438eb@89.116.139.8:656,fbfd48af73cd1f6de7f9102a0086ac63f46fb911@65.108.231.124:41656,2d12c15f19deb4ab13035959d2d1a91d786c4fd2@158.220.103.21:23256,4cfa1292c6b277e04508733cf6ceb8c41cb0b520@2a01:33656,fe7be8b731041a1d436956af01cbb0db099f2921@213.199.33.90:47656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.pryzm/config/config.toml

sudo systemctl restart pryzmd
sudo journalctl -fu pryzmd --no-hostname -o cat
```

## Our peer for Pryzm
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
8a863ae1b1b5f840eafd93d4712fe88c4656f188@pryzm-t-rpc.noders.services:25656
```
