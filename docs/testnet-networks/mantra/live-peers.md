---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-mantra">
# Live Peers
</div>
###### Chain ID: `mantra-hongbai-1` | Current Node Version: `v3.0.0`

## All Live Peers for Mantra
Here is a list of 24 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
d5519e378247dfb61dfe90652d1fe3e2b3005a5b@65.109.68.190:17756,46598983ec8e816787fe0d7ab29de63bdb91b733@95.217.35.179:50056,3dc6258284c5e432cec466298fdb7708c811f546@128.140.94.213:26656,df6c0f9f2aa194cf60abe9aa49612630b4c7d585@148.113.16.164:26666,df5362cb44533cb3f65c67075db214ccf154c568@37.60.225.54:11656,042c33fb6929d4d8a1f3d1c25694912ef1d6673e@162.55.245.144:2040,f138d81674e4bf274bcaf79722188ac30c3067a2@185.162.249.161:25156,8ed3ebfc2f50f078d469dd9343913359f702f047@95.111.226.87:26656,73956e737ba09e773136a547d804faa6053caf57@77.237.239.158:12656,12b570a05ffc23a4dbdb26bcf5df577175ca68ad@167.86.87.34:16456,01c4a10936c75d77046444b885badccffaa21d8a@94.72.116.9:22656,d6016af7cb20cf1905bd61468f6a61decb3fd7c0@34.72.142.50:26656,b96924d146c3afbfe13c8e9859ce989399228a29@176.57.189.36:12656,dae4865e67f7f1ff8a423ef81824cc09d33b6fd2@109.123.250.123:656,d3a29a31c0c2e2cfb779902f7bcec5d50b6bda3a@113.176.163.161:26656,9a89d99ffcc750b6633804fc68cc1a8728e15267@5.189.164.73:23656,5ef3d0f9fc00b19d6d6bacd594328aec1d2f8971@194.238.25.171:23656,2df175a07e23d38a9e7c8d19dc1662c96f079539@178.128.113.181:26656,89e0552cbb7c3404dd927d9f3dc8b7f88a491793@45.85.147.82:23656,46d7c5e159e9c5631798f2f1f526e80bbd16b786@65.108.232.48:22656,99eeb1fca4fb5b6fd4cbaf71c3d86c20f3f6c915@185.84.224.125:25156,a9a71700397ce950a9396421877196ac19e7cde0@65.108.231.124:22656,f80cb8b3a5492b6c4a442eb2ea7d1681240ebe61@193.30.121.54:25156,5939d5826d5e8895e32dead91d7199ff779201b3@185.245.183.82:16456
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=99eeb1fca4fb5b6fd4cbaf71c3d86c20f3f6c915@185.84.224.125:25156,3dc6258284c5e432cec466298fdb7708c811f546@128.140.94.213:26656,df5362cb44533cb3f65c67075db214ccf154c568@37.60.225.54:11656,d6016af7cb20cf1905bd61468f6a61decb3fd7c0@34.72.142.50:26656,2df175a07e23d38a9e7c8d19dc1662c96f079539@178.128.113.181:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.mantrachaind/config/config.toml

sudo systemctl restart mantrachaind
sudo journalctl -fu mantrachaind --no-hostname -o cat
```

## Our peer for Mantra
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
f32589afc557a5c4a372f38dae72fbaaa8a5b98d@mantra-t-rpc.noders.services:30656
```
