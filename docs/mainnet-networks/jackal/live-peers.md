---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-jackal">
# Live Peers
</div>
###### Chain ID: `jackal-1` | Current Node Version: `vnull`

## All Live Peers for Jackal
Here is a list of 27 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
0a1d5f4c6fa533d96189094e12c35efb34037b30@23.88.103.35:26638,bdb9cc3833ecba797cd2275e0bd81c2a7fc410b1@168.119.90.246:17556,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:13756,198f2b0c2564a234547c04e98a3e11c05616fb3e@176.9.150.48:11126,272a2763ef6bff05eaf55140f1168864834ca91e@65.108.66.174:28656,713d202326eedaed41d467b26051aba62727febd@5.9.69.241:26656,e517112d2b8970010382ba9095c6297477c730f0@161.97.77.219:26656,0d040fb982247ab5a86d940f735b4c5143e7f953@65.109.105.110:12656,1bba5fd248d8ad044add8ffc43b6de4051d09e62@135.181.114.91:26656,2ec46ff04ebfafc19f505feaaf00943c15bb2757@15.235.114.33:26656,e44e91665ad9d02cbd879219faaa04bc767ab41f@65.109.86.84:26656,272b2dda49437eb55392e9b7153a44f881e1511c@167.235.9.223:26656,f256abc3eafd82ed1a763a3fa969bcf72a627f26@167.235.179.241:17556,41c19eebb3879cd9f4a7561c0953af7d1564624b@167.114.159.157:26656,f6ffe91c468dcce5f387a8ed96fb8f151fdf1aea@51.15.19.175:26656,a10f4d038760b6348794f2cb4bc88fe8da2905ee@65.108.70.119:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@195.3.223.168:26906,27a79ac3336695ea041cc3efda31672f05b31b45@185.248.24.16:26656,51cbeb39315ef7366b77953ebf6ad905443e6e30@65.109.93.44:17556,d39fecbc409541de13fa644d90066d4dabe08262@95.165.89.222:24475,7574e0ab179fc6cc47ac89284f4641790218540e@18.163.165.245:26626,ef43b6453a8cef8027c584d1fa8774114b1a6648@195.201.175.156:17556,d9bcb3635b562cb81fc4f5fb60a5ae4a28914ebb@65.108.232.181:26656,c6929b2a26cf02c084951d1b634af385d750a9d3@65.21.95.15:44656,77a98f128539de705bf18f3225e08dff4355f7e7@158.69.125.73:10956,0a9964ddf7d0aeb8d361b6b91e9af43601d82239@65.108.230.113:11126,170397e75ca2b0f4e9f3b1bb5d0d23f9b10f01c7@142.132.200.233:30602
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:13756,e517112d2b8970010382ba9095c6297477c730f0@161.97.77.219:26656,198f2b0c2564a234547c04e98a3e11c05616fb3e@176.9.150.48:11126,d9bcb3635b562cb81fc4f5fb60a5ae4a28914ebb@65.108.232.181:26656,41c19eebb3879cd9f4a7561c0953af7d1564624b@167.114.159.157:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.canine/config/config.toml

sudo systemctl restart canined.service
sudo journalctl -fu canined.service --no-hostname -o cat
```

## Our peer for Jackal
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
5b622b13c4b0bdeea993bc3ec4d9cf269819893e@jackal-rpc.noders.services:26656
```