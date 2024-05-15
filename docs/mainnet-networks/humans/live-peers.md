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
Here is a list of 23 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
f913050241ce5fd49ea3783ed21724ad05db7291@65.109.125.235:26656,7e99cb89f22ae507ca12063d91e51ab5d843a288@65.108.101.109:18456,5e51671241340f1d1e1409a9e0cc4474820bf782@65.109.116.151:17656,d70c9343af28023a78aceb653e885666c12fec3b@138.201.121.185:26687,f9344349e8435362bc7f21f67b9b61d2f1d6891b@152.32.174.173:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:12256,d6a9f7312a119abb36979687c5f05126a7b5ad16@135.181.5.232:18456,b2e6a64c646b60e3097082f32b942ee7247893c5@65.109.115.172:18456,fd09725dc4c9cc8430ae0a3037bb1ff322b30494@178.23.126.101:31304,60aa6df96d45ffd74c45d15f7f5670f0009ca670@65.108.71.137:18456,33f4d6b3a09e5ee651b49b2f6e0eb3294a3adb86@135.181.133.120:26656,3cc32215c9edd2aa3a07714a1c8818b2ef685053@162.19.84.221:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@195.3.220.73:27536,7889ee17b291451155190d40426e6154be4e1abc@135.181.142.60:15608,e7533ed775d00e1e6376eea8ef42d14568a761d1@34.247.66.18:26656,28bc23066c91b4264a22d5f62ca4dc87741e9553@35.178.206.43:26656,1d038d7318974ce6fe031161d5ed530c93844089@65.108.234.137:18456,94a589700c3cdff4a3d74c57bfd5721dbcbcdf8c@148.251.235.130:12656,29e0f8dec39425ade6f9c83fac1c0b826552a4f7@57.129.24.27:26656,250d5926777e735519813157e444f84212fc8290@5.161.216.102:26656,b05e9018dbe13d5706a6eba13050890865dbe1c2@135.181.208.166:28656,f8006da7d742777eeca0194b94586c8f147be4f6@142.132.253.112:17656,babc3f3f7804933265ec9c40ad94f4da8e9e0017@38.146.3.100:18456
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d70c9343af28023a78aceb653e885666c12fec3b@138.201.121.185:26687,29e0f8dec39425ade6f9c83fac1c0b826552a4f7@57.129.24.27:26656,f913050241ce5fd49ea3783ed21724ad05db7291@65.109.125.235:26656,d6a9f7312a119abb36979687c5f05126a7b5ad16@135.181.5.232:18456,b05e9018dbe13d5706a6eba13050890865dbe1c2@135.181.208.166:28656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.humansd/config/config.toml

sudo systemctl restart humansd
sudo journalctl -fu humansd --no-hostname -o cat
```

## Our peer for Humans
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
284fa3bdcdfd0d5aba7047db88f26d7a8ef38ed7@humans-rpc.noders.services:21656
```
