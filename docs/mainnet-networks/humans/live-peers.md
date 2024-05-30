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
60aa6df96d45ffd74c45d15f7f5670f0009ca670@65.108.71.137:18456,d6a9f7312a119abb36979687c5f05126a7b5ad16@135.181.5.232:18456,2f8a0bf63e23606dc85bdd11afbf34e68a9f3b74@46.38.232.86:40656,fd09725dc4c9cc8430ae0a3037bb1ff322b30494@178.23.126.101:31304,8cf509aeecdd2f84e690f06d707c0fa9e679e441@51.222.44.116:17656,f9344349e8435362bc7f21f67b9b61d2f1d6891b@152.32.174.173:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:12256,20f95f8b8dd32b94b593dc3e8fcf0b0aeb74b85d@94.237.93.65:26656,1d038d7318974ce6fe031161d5ed530c93844089@65.108.234.137:18456,b2e6a64c646b60e3097082f32b942ee7247893c5@65.109.115.172:18456,7e99cb89f22ae507ca12063d91e51ab5d843a288@65.108.101.109:18456,637077d431f618181597706810a65c826524fd74@176.9.120.85:18456,02daf8764bcb476c1091ea1cd85c8012f1f4d85a@94.130.32.7:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@195.3.220.73:27536,3cc32215c9edd2aa3a07714a1c8818b2ef685053@162.19.84.221:26656,29e0f8dec39425ade6f9c83fac1c0b826552a4f7@57.129.24.27:26656,94a589700c3cdff4a3d74c57bfd5721dbcbcdf8c@148.251.235.130:12656,d3f0d75b9729bf7321ba44d678bf17075cbf1ca8@5.161.110.13:26656,f913050241ce5fd49ea3783ed21724ad05db7291@65.109.125.235:26656,f8006da7d742777eeca0194b94586c8f147be4f6@142.132.253.112:17656,28bc23066c91b4264a22d5f62ca4dc87741e9553@35.178.206.43:26656,e7533ed775d00e1e6376eea8ef42d14568a761d1@34.247.66.18:26656,081d17fcdaeaf917bdc874946c97a553d0ec2aae@176.126.87.56:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=94a589700c3cdff4a3d74c57bfd5721dbcbcdf8c@148.251.235.130:12656,f8006da7d742777eeca0194b94586c8f147be4f6@142.132.253.112:17656,d6a9f7312a119abb36979687c5f05126a7b5ad16@135.181.5.232:18456,f913050241ce5fd49ea3783ed21724ad05db7291@65.109.125.235:26656,28bc23066c91b4264a22d5f62ca4dc87741e9553@35.178.206.43:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.humansd/config/config.toml

sudo systemctl restart humansd
sudo journalctl -fu humansd --no-hostname -o cat
```

## Our peer for Humans
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
284fa3bdcdfd0d5aba7047db88f26d7a8ef38ed7@humans-rpc.noders.services:21656
```
