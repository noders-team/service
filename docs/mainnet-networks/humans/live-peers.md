---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-humans">
# Live Peers
</div>
###### Chain ID: `humans_1089-1` | Current Node Version: `v1.0.0`

## All Live Peers for Humans
Here is a list of 26 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:12256,29e0f8dec39425ade6f9c83fac1c0b826552a4f7@57.129.24.27:26656,d891375ab1a016710d0b6115463a3fcd972a578b@37.27.61.49:40656,d6a9f7312a119abb36979687c5f05126a7b5ad16@135.181.5.232:18456,524d635a8b60111ba5e44ca9bea4948d84b5a937@65.109.154.185:30656,637077d431f618181597706810a65c826524fd74@135.181.0.47:18456,28bc23066c91b4264a22d5f62ca4dc87741e9553@35.178.206.43:26656,f913050241ce5fd49ea3783ed21724ad05db7291@65.109.125.235:26656,94a589700c3cdff4a3d74c57bfd5721dbcbcdf8c@148.251.235.130:12656,abd78601b249e56a0d88d8ea361bae8e36cbf804@103.180.28.92:26656,2c794ee1f17095cb10773e8b0dc2f63a16d7ec37@157.143.106.66:33656,ebc272824924ea1a27ea3183dd0b9ba713494f83@195.3.220.73:27536,ca92abdc4599dd91dd63e689c64c468df5425f2c@95.216.100.99:12256,d70c9343af28023a78aceb653e885666c12fec3b@138.201.121.185:26687,250d5926777e735519813157e444f84212fc8290@5.161.216.102:26656,3cc32215c9edd2aa3a07714a1c8818b2ef685053@162.19.84.221:26656,20f95f8b8dd32b94b593dc3e8fcf0b0aeb74b85d@94.237.93.65:26656,589eaa7656ff1af6c50f32d7b63dda1cf83c7906@46.39.246.50:26656,eae7ee037b5e21df835bf13e2f47ddf2e5a4c463@145.239.254.154:30156,e7533ed775d00e1e6376eea8ef42d14568a761d1@34.247.66.18:26656,7889ee17b291451155190d40426e6154be4e1abc@135.181.142.60:15608,f8006da7d742777eeca0194b94586c8f147be4f6@142.132.253.112:17656,0856207c45df67022f8d9ee007f00606b9b74d3e@3.141.12.3:26656,93e26a797f0b1740e515187b0f9e02565d48d31c@65.109.112.170:33656,081d17fcdaeaf917bdc874946c97a553d0ec2aae@176.126.87.56:26656,54b384bdc3c35db647889f69a88aa976ec37e4e8@52.91.26.89:666
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=524d635a8b60111ba5e44ca9bea4948d84b5a937@65.109.154.185:30656,abd78601b249e56a0d88d8ea361bae8e36cbf804@103.180.28.92:26656,081d17fcdaeaf917bdc874946c97a553d0ec2aae@176.126.87.56:26656,d891375ab1a016710d0b6115463a3fcd972a578b@37.27.61.49:40656,54b384bdc3c35db647889f69a88aa976ec37e4e8@52.91.26.89:666
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.humansd/config/config.toml

sudo systemctl restart humansd
sudo journalctl -fu humansd --no-hostname -o cat
```

## Our peer for Humans
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
284fa3bdcdfd0d5aba7047db88f26d7a8ef38ed7@humans-rpc.noders.services:21656
```
