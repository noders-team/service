---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-crossfi">
# Live Peers
</div>
###### Chain ID: `crossfi-evm-testnet-1` | Current Node Version: `v0.3.0-prebuild3`

## All Live Peers for CrossFI
Here is a list of 38 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
bac7399246b676462f01ce7c675d1db9a500a489@37.27.59.71:26056,087e70916b110025e25626c41a1173166be9f2db@65.21.32.216:60856,7ec8e5dad5ed81b6fd275284386eb651b6e8bc8c@65.109.97.248:26656,1da91b392ad7a380fd176e9b3cefd58fd719f7eb@37.27.11.198:26656,7cf560362e08b2faac16e65cf658a53200c2621c@65.21.196.69:26656,54d39f9900e89427df4cb78c8b4e0dccc36d8485@65.109.68.69:26656,01e0df1e6932c371640cf44e80c8f0fd28675a6b@65.109.93.58:26056,d2e91f7beb01e0bade12a7bae7c78bfee0ef7ca4@95.217.199.12:26605,97c1dd3bad013143d75fab4bfd55d15939eea39a@128.140.4.126:26656,e70bb3d11fb5eea73b2938b09442c911b475145f@49.13.203.185:26056,fd425bb6d95b2abdcc74e5b44f3ae6c16a38d0ac@168.119.96.10:26656,c90c4360be9ff903c4c58f4bb5a1e0322640616a@167.235.12.38:14656,03cdf2792e994e15e17d8698346f31de570533af@136.243.104.103:23956,55352556de7f26d85ff8b83bb4d6552a2dac8964@37.60.238.186:36656,352d61156f5cefd81bd2f65206db43b8226b7be3@57.128.63.22:26656,660e9306994e8e6690c0f076be45a4439c78fe0d@198.244.215.141:30656,eb42758cab3b6cf4883dac15c605ff23fcfe2925@37.60.251.62:26656,4715214d543eb362c11ebd4a14c08d18278ee3af@194.150.220.191:26656,8b7f44a0e04fe817e089839b8a2e69189f024d5d@37.60.246.80:15656,4975453979deeb048e3f5d4ad07959928f3069b8@51.81.185.180:36656,8529c3537e3873e1b3f5a9992bb775996b1d198e@46.250.238.106:26656,39ab4ec04d314c27bdfffa045a7b1b58806382ea@15.235.144.20:14656,49329ba22c738e0a8ba172e84e187f0f8409e419@95.216.22.44:16656,5ebd3b1590d7383c0bb6696ad364934d7f1c984e@160.202.128.199:56156,4b6c13b8820fd6c1bcf5e36c3097a1b64e4e3b8c@152.53.18.245:11656,57757c6e0cfae31ab548e2e31bf27f964fe701e4@128.199.224.200:26656,b3e04f754675ec53919a26ea990918f8f7bd69e5@144.217.68.182:26056,8b66ffd88c967f7903145aed74f792721785a04b@185.250.37.122:11656,2ce3b5d3ce236afe1fe1f4024c888ea59febac4a@65.108.206.118:60556,24f414646750bae4afb1190f80140851dc702b65@159.223.194.26:26056,dda09f9625cab3fb655c22ef85d756fc77132b9d@167.235.102.45:10956,a6bd4324b0247ede4fe8c7521f2e9267cb5b7bd2@81.0.220.178:13656,66bdf53ec0c2ceeefd9a4c29d7f7926e136f114a@65.109.36.231:36656,5301b7903d8bf74a183ff3316bb8645f18950da3@37.120.173.44:11456,bf6ae47aa4746811d47d495f3ae1987118541343@65.109.93.152:26806,c8914e513463791d91cc9ab35035c0c1111f307f@84.247.183.225:36656,1e73da0b04fc067147dac665800f39d439c7c2bf@144.91.126.238:11656,2e6308d166b358b0b57f5dec6e0b8b57430ed898@65.109.30.35:36656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=c90c4360be9ff903c4c58f4bb5a1e0322640616a@167.235.12.38:14656,660e9306994e8e6690c0f076be45a4439c78fe0d@198.244.215.141:30656,39ab4ec04d314c27bdfffa045a7b1b58806382ea@15.235.144.20:14656,54d39f9900e89427df4cb78c8b4e0dccc36d8485@65.109.68.69:26656,bf6ae47aa4746811d47d495f3ae1987118541343@65.109.93.152:26806
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.mineplex-chain/config/config.toml

sudo systemctl restart crossfi.service
sudo journalctl -fu crossfi.service --no-hostname -o cat
```

## Our peer for CrossFI
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
81000f9c5c412477c6ca442e9ead247e6118a515@crossfi-t-rpc.noders.services:12656
```