---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-jackal">
# Live Peers
</div>
###### Chain ID: `mesomelas-1` | Current Node Version: `vcanary-17-gb6ed8056`

## All Live Peers for Jackal
Here is a list of 11 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
d93aa0a8f21ab9d017f84d41f31a354de786c98a@65.108.121.227:48656,042268baf43bcce4f19640fbadb1c7b406ee71c4@135.181.212.139:46656,385d0023677379fe17763e13497f3861809353de@65.109.92.241:19126,94b63fddfc78230f51aeb7ac34b9fb86bd042a77@65.108.225.67:30504,833539b808a53149267f72e0447c3af41a445e99@78.46.45.174:28656,aa4a797eba8800513965091222e74c1b81e20277@77.52.182.194:26656,b7dda02b53b7d9e70baa2721a3e054ba9f989b17@144.91.66.143:26706,0fb9469cd146bd4ede4f34111061d749a0ba7cfa@65.21.198.23:26656,27238e2f804bf28a14c186a2e0f0ceaae0d2588f@142.132.134.181:30503,e01035ce1ba113e22afdb97981d3b1179d6dca41@173.249.56.120:32456,7a6c104e53c9f8329be5d63e58e8ba24ee28b39f@213.170.135.20:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d93aa0a8f21ab9d017f84d41f31a354de786c98a@65.108.121.227:48656,042268baf43bcce4f19640fbadb1c7b406ee71c4@135.181.212.139:46656,385d0023677379fe17763e13497f3861809353de@65.109.92.241:19126,94b63fddfc78230f51aeb7ac34b9fb86bd042a77@65.108.225.67:30504,0fb9469cd146bd4ede4f34111061d749a0ba7cfa@65.21.198.23:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.canine/config/config.toml

sudo systemctl restart canined
sudo journalctl -fu canined --no-hostname -o cat
```

## Our peer for Jackal
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
687a7185b8310900fa0a176f913e6996d591c95d@jackal-t-rpc.noders.services:14656
```
