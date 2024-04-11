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
Here is a list of 18 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
f6c5ff15414bdaaeff59f555eae5ca745c03b37e@77.68.30.186:26656,31942da60244c7cd7e05db5d85d82557859414d5@198.244.213.136:26656,b494815518d3075408cff6f03d6058c99756dc29@65.109.111.218:31056,360c68f66b8e165a293af3ec7677728d4eaddea0@116.202.115.248:26656,9755cab2585a2794453a5b396ef13b893393366f@65.108.212.224:46657,e2d1eb6884db2264d31f381b76e7661c2e61d3cf@87.21.138.237:26656,09abed295e840d2389c2d476375361fc01a2ea0a@13.215.218.116:26656,4cc01e8420a0437f843ea39c459aed171e765c61@95.216.46.125:44656,3bcf529b6d529c86fececbf8b58b7f8801f3f60a@57.128.133.20:26656,7ff95d67cb57b44eba11bed8f3a157eb42bf8311@153.139.245.107:26656,03d8998530017c29e57f1d164c556e28ff48e710@65.108.76.28:22956,14358a7f970cc0b790d9d8f24513aa11eaf6297f@65.108.238.166:22956,4ded49b3a718828eb64cf35da1ed791ecb201bc1@65.21.202.61:25017,420994846f175d0413796be9caea49e07ad3a503@65.109.153.140:16600,ebc272824924ea1a27ea3183dd0b9ba713494f83@185.16.39.172:26666,c9e8094b9616ddbe006192459415eec63015b3a2@13.228.223.191:26656,115d01baed3907b6b939bb0c052548f9fd3e09eb@135.181.138.95:12070,543e0cab9c3016a0e99775443a17bcf163038912@34.150.156.78:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=3bcf529b6d529c86fececbf8b58b7f8801f3f60a@57.128.133.20:26656,14358a7f970cc0b790d9d8f24513aa11eaf6297f@65.108.238.166:22956,09abed295e840d2389c2d476375361fc01a2ea0a@13.215.218.116:26656,360c68f66b8e165a293af3ec7677728d4eaddea0@116.202.115.248:26656,31942da60244c7cd7e05db5d85d82557859414d5@198.244.213.136:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.band/config/config.toml

sudo systemctl restart band.service
sudo journalctl -fu band.service --no-hostname -o cat
```

## Our peer for Band
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
9bb1dc1d54ad290b7b17960bb0313dfd14426b68@band-rpc.noders.services:30656
```