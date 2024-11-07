---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-jackal">
# Live Peers
</div>
###### Chain ID: `lupulella-2` | Current Node Version: `canary-17-gb6ed8056`

## All Live Peers for Jackal
Here is a list of 22 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
7ef99a7ba81e0b4f4bd9cd1a691ff712646d8ee5@62.171.154.52:17556,7eddf2da4e97de8155b8cfbd84f7b41be7a47c19@3.121.30.80:26626,dc84774683298e57a848b59b7c0d1a70477b4fc1@213.239.207.175:48656,451622fd913f6119a67f67e65f3ab82c3fbea529@78.107.253.133:32656,0394449cab5a29f24dd4f37683d3b7622f27c0fc@65.108.206.118:61156,34bb04a3e226493e5d142c74bf78d2ed2803ee9d@213.133.100.172:27464,1a25583f633b4fe12fe62737127986c78327f77a@95.217.228.108:26656,0dfa26df34bdba882bb465d030c0a9559e1170ea@152.53.36.104:46656,f3e70d3de1974208af04dac6fabd657ab4abf0ff@65.108.75.107:24656,bb2aa5ae8af231be2cc1875c3ec2d869dd0638ed@135.181.88.132:26656,e0bbd062b09dd71a06edf96a446273d0e8bb3c45@144.76.97.251:26746,0e9b017991510efeee3b6aaf095e8f840fcf1d65@142.132.202.92:26856,e1cb78599d1affda75cbb004d7b5082e1ae6d0f1@135.181.201.4:26656,0250f90f8321f159ad13422de9a2b89f6585d9b3@65.109.84.33:17556,bda5e61d05f423919783ff73dc096ac3a8eef5c3@65.108.57.170:26656,14113e100f1c466cc2fee7505154b8ada523cbad@212.23.222.109:26456,56fe0d26dd1e32f049500ab0d216658788b95cc5@65.21.88.86:16656,11b91d243d43e761c96cfbf49f2f2bd06cce2df8@65.109.23.114:17556,3d3408f7768441344a7cf8c3b313f9309930464d@173.212.231.154:31656,ec78732a7d5bdc1e27e8d7ac1bffe3881c9fb271@65.108.226.183:17556,d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:13756,b4702f51f24731b3892b5ca9ceed1a3436f7a629@94.130.164.82:17556
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=0dfa26df34bdba882bb465d030c0a9559e1170ea@152.53.36.104:46656,bda5e61d05f423919783ff73dc096ac3a8eef5c3@65.108.57.170:26656,b4702f51f24731b3892b5ca9ceed1a3436f7a629@94.130.164.82:17556,d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:13756,e0bbd062b09dd71a06edf96a446273d0e8bb3c45@144.76.97.251:26746
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.canine/config/config.toml

sudo systemctl restart canined
sudo journalctl -fu canined --no-hostname -o cat
```

## Our peer for Jackal
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
40b59e9b4a85b4ac6aa372e31cc0d733280c2769@jackal-t-rpc.noders.services:14656
```