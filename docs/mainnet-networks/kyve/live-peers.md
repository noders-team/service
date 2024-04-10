---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-kyve">
# Live Peers
</div>
###### Chain ID: `kyve-1` | Current Node Version: `v1.4.0`

## All Live Peers for Kyve
Here is a list of 27 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
0f465256aacb6fc7e8bb39a99351a60cc32a0af0@165.22.85.89:26210,a62ac612362d0fbf0b390136d6be6f83dbbb2410@178.23.126.82:31305,b478f11e4459143a1e9a296dc0c9c9751d25e765@15.204.199.71:26656,2eb9611e3127067f90745cb28903dfe2ef663805@167.71.202.255:26210,42cb3ae7c2ecf81964ebac1b2081397d24b79df4@65.108.238.102:11056,abd78598669172e674b5fa93be48c8bde6361c5e@146.59.85.223:11056,66a74237244c225dfb52f673c65525f67b383213@136.243.36.60:11056,b507395f62f3acede750a23a780957de58b26ea6@134.122.14.188:26210,b322a6897466c2cdcd2730ac8a410e8e474bc42f@178.162.166.24:45656,0bfd15bfd8dc7ac8b2e53b59f87ae1e5ebd22301@164.90.196.95:26210,74640af95aa5231a4f5b03ca945b1c2cb89a1ed3@169.150.206.206:26676,bb3712bbf2c07a3642690712cba3c46ea96f3c22@176.9.92.135:60956,874175afbe613a80fdda7e56d3e55a6ba1365def@65.108.232.181:26656,22ad629016c8cbaf9195240af6f7f8a857957156@144.76.63.67:26209,68be3bd1182e4a2039d3f4c2a9a63ddee79bc734@65.108.200.61:11124,f034665ac019789c8b7ac1a1c8b524e5395ea62f@162.19.84.205:26656,616c13b4bdec56d308dce99f8453d0522029956d@202.61.243.159:26656,5c6f2456d0deb4a5de755240a95bb588f51613e9@18.224.68.223:31306,bb4e23e62451dbf18e19c0ce160fde817e8b7d85@161.97.133.100:26656,59fcea08fe65920f39055b31b4bab5d5d0d9c126@211.219.19.72:36656,38c06caf92af26d3d6943ff60fecaab7355aa6f1@65.108.232.180:11056,196caa0750701d2f9ef32b2fe80a339a256845ea@148.251.8.22:26756,a66256c1eafabdd7ce0df8688c0e526a562900ba@167.235.177.226:25656,8b1fc21a45545a4e7fcfec0f706fa1f0aee830dc@65.108.39.140:11056,d33779a4b30ee01d0b5c2a903351af54605cda42@194.140.197.61:26656,2d3b8fa61527f272f811fdaa7fbf72a414394351@104.196.101.86:26656,1b1417ec10e70c9add1c710f91e90698da32dda9@135.181.145.190:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=0f465256aacb6fc7e8bb39a99351a60cc32a0af0@165.22.85.89:26210,22ad629016c8cbaf9195240af6f7f8a857957156@144.76.63.67:26209,5c6f2456d0deb4a5de755240a95bb588f51613e9@18.224.68.223:31306,a66256c1eafabdd7ce0df8688c0e526a562900ba@167.235.177.226:25656,b478f11e4459143a1e9a296dc0c9c9751d25e765@15.204.199.71:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.kyve/config/config.toml

sudo systemctl restart kyved.service
sudo journalctl -fu kyved.service --no-hostname -o cat
```

## Our peer for Kyve
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
9150bbb576e81cfe6776987bc6bc47be3c1a6b89@kyve-rpc.noders.services:15656
```