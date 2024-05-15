---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-seda">
# Live Peers
</div>
###### Chain ID: `seda-1` | Current Node Version: `v0.1.1`

## All Live Peers for Seda
Here is a list of 25 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
2e9ecccdeff4dc0e5e26cc9adf7ed6f46cc66833@65.108.234.137:25856,b985a3f2c968fefc6995a8088fb90d77b48702c2@88.198.65.44:25856,fc319e170aea3e99c75eb411505bd0a6d938b4e2@109.199.127.16:25856,13c7f894e0079c05646f064be44c8fc901583898@5.78.118.154:26656,a3fbd8291f7d6a2170f7b1a0e10542b809fd43a1@195.201.106.166:25856,32aaa561eb4c2cf54f18b08e14b3c756eee44183@221.148.45.106:28656,61cd71c112c195cae1aba2d30c5164d844b27079@93.159.130.37:36656,d60b25fe2c523893a739b81dca99b2ecf571c8d8@65.108.101.109:25856,d0e1f122c765c630e3fccfd833c6df3178bdf5a5@152.53.32.140:6656,4a8066ca98dc7e196f8b437217215459b32d0ae1@65.108.64.116:25856,d93bf904367aab865ea56d2d632db8fbb98caa5e@168.119.90.246:25856,6e95a13efcc51b4be1ad2a69d5501a9ee7f5b957@142.132.248.34:25856,1a87a68c8a03ecbf6d6e65d4ce780d72d5498c0f@65.108.71.137:25856,cd864fe020064aa7afd3c6b9fc47d4592c0d5c39@116.111.217.196:17656,7c522356a7b56371d79c3b3e2e90cc0fbcabe123@65.108.99.37:44656,54ad1b2d8f97897f63238955530aadd3349f0605@185.182.194.239:26656,f8846039206179880bdcaf371aa295f44f2af975@95.217.39.34:25856,ebc272824924ea1a27ea3183dd0b9ba713494f83@195.3.220.73:26866,31f54fbcf445a9d9286426be59a17a811dd63f84@18.133.231.208:26656,4c11b3f3a350486af3d1335456d6fb7ac783b92a@88.216.198.164:26656,890b794f718e6d679bdab4bb297d2ba0f4ea86d3@65.21.192.115:25856,d4b0af2651d980d1a12267b8b936689120f39aef@195.201.10.252:17356,02cadb2a0ab4599ce311da557509461e56702e17@95.217.210.43:26656,36549dd3e9099df591638f122a8648783c6921bb@85.239.240.199:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@37.27.61.38:17356
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d4b0af2651d980d1a12267b8b936689120f39aef@195.201.10.252:17356,d0e1f122c765c630e3fccfd833c6df3178bdf5a5@152.53.32.140:6656,ebc272824924ea1a27ea3183dd0b9ba713494f83@195.3.220.73:26866,cd864fe020064aa7afd3c6b9fc47d4592c0d5c39@116.111.217.196:17656,f8846039206179880bdcaf371aa295f44f2af975@95.217.39.34:25856
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.sedad/config/config.toml

sudo systemctl restart sedad
sudo journalctl -fu sedad --no-hostname -o cat
```

## Our peer for Seda
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
c9100af84ba8c9dbeb0c1c49837620bf447bf55c@seda-rpc.noders.services:36656
```
