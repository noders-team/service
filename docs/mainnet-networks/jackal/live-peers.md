---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-jackal">
# Live Peers
</div>
###### Chain ID: `jackal-1` | Current Node Version: `v3.2.1`

## All Live Peers for Jackal
Here is a list of 16 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:13756,a79da224ad9d4501dbf1d547986ebec55d56b951@135.181.128.114:17556,77a98f128539de705bf18f3225e08dff4355f7e7@158.69.125.73:10956,0b920e3ac61d76b69c28ea329bad5f1427e415f9@144.76.40.53:17556,272a2763ef6bff05eaf55140f1168864834ca91e@65.108.66.174:28656,0a9964ddf7d0aeb8d361b6b91e9af43601d82239@65.108.230.113:11126,4398bd773ac885b7365de3604eb487be10c54563@185.16.38.210:26906,34b9ecb44339b2bd20302f05204030c942246d1d@65.108.41.177:13756,ea35106e43dcec1e5c66319272da48df3dce7723@57.128.144.233:26656,bdb9cc3833ecba797cd2275e0bd81c2a7fc410b1@168.119.90.246:17556,058db1a4884feeea989a78a071e2976554ba0c45@103.180.28.103:26656,1f78eec8eec2a1a1d682d4a35ea4b2703a1515a0@5.9.73.62:30592,4e3146c7f9419cb7b8daa6672fa8512789344953@51.210.223.80:17556,92c687b1ad021997b95e370517b935560f9f2bba@65.108.44.149:23656,d39fecbc409541de13fa644d90066d4dabe08262@95.165.89.222:24475,60ed6ffd5748268b80f3a1ecb2a26724d7de5fad@94.130.13.187:24656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=bdb9cc3833ecba797cd2275e0bd81c2a7fc410b1@168.119.90.246:17556,0a9964ddf7d0aeb8d361b6b91e9af43601d82239@65.108.230.113:11126,272a2763ef6bff05eaf55140f1168864834ca91e@65.108.66.174:28656,1f78eec8eec2a1a1d682d4a35ea4b2703a1515a0@5.9.73.62:30592,34b9ecb44339b2bd20302f05204030c942246d1d@65.108.41.177:13756
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.canine/config/config.toml

sudo systemctl restart canined
sudo journalctl -fu canined --no-hostname -o cat
```

## Our peer for Jackal
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
5b622b13c4b0bdeea993bc3ec4d9cf269819893e@jackal-rpc.noders.services:26656
```
