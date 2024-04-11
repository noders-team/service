---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-band">
# Live Peers
</div>
###### Chain ID: `laozi-mainnet` | Current Node Version: `v2.5.4`

## All Live Peers for Band
Here is a list of 16 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
58bfee0d530bda8e898ddb96670d0523478c0199@18.176.159.241:26656,31942da60244c7cd7e05db5d85d82557859414d5@198.244.213.136:26656,115d01baed3907b6b939bb0c052548f9fd3e09eb@135.181.138.95:12070,360c68f66b8e165a293af3ec7677728d4eaddea0@116.202.115.248:26656,268c44707b65471851e70c26d00c8ec9261c15a4@65.108.122.246:26646,e2d1eb6884db2264d31f381b76e7661c2e61d3cf@87.21.138.237:26656,09abed295e840d2389c2d476375361fc01a2ea0a@13.215.218.116:26656,4cc01e8420a0437f843ea39c459aed171e765c61@95.216.46.125:44656,3ea84babead3d6bc488810a0f2cf0744cf5c68fe@34.86.22.251:26656,3bcf529b6d529c86fececbf8b58b7f8801f3f60a@57.128.133.20:26656,8a96cdf90a982ef6040ac0a679522917464518e7@93.159.134.156:28656,03d8998530017c29e57f1d164c556e28ff48e710@65.108.76.28:22956,7ff95d67cb57b44eba11bed8f3a157eb42bf8311@153.139.245.107:26656,9e51dd20dfaee7fda4dd0109aae1a817b94adc69@157.143.106.70:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@185.16.39.172:26666,b060fabc0b564d16d7b224fd59e78483ee5714bc@62.171.182.169:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=360c68f66b8e165a293af3ec7677728d4eaddea0@116.202.115.248:26656,58bfee0d530bda8e898ddb96670d0523478c0199@18.176.159.241:26656,09abed295e840d2389c2d476375361fc01a2ea0a@13.215.218.116:26656,4cc01e8420a0437f843ea39c459aed171e765c61@95.216.46.125:44656,03d8998530017c29e57f1d164c556e28ff48e710@65.108.76.28:22956
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.band/config/config.toml

sudo systemctl restart band.service
sudo journalctl -fu band.service --no-hostname -o cat
```

## Our peer for Band
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
9bb1dc1d54ad290b7b17960bb0313dfd14426b68@band-rpc.noders.services:30656
```