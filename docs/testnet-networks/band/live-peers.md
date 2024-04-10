---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-band">
# Live Peers
</div>
###### Chain ID: `band-laozi-testnet6` | Current Node Version: `v2.5.4`

## All Live Peers for Band
Here is a list of 25 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
29b27a47572f3fb95d815001015d20e06ef6523a@78.46.103.246:62156,5068f8d98106537d555fe417c798ee8dd3806352@35.212.3.212:26656,a9a5dc3f8c02287d1a3db0d284fb1eea343ebc54@35.213.162.1:26656,f214d9da468858654b57eefbbd2c65fe270bc606@35.212.180.119:26656,cf1c0fa3f5320f29c3793cbf769d9e94c0c16df9@35.213.128.139:26656,bd689bd5a096bc9e72840ff01ff109ee5d4e575b@35.212.209.205:26656,cf97b7d6a86c2dffefe0c4ee72748ff1dcedd713@35.213.156.49:26656,7ee9f9459010edd0e147c0b70b43d0bff9336f30@65.108.226.26:12656,069d0293c718c96d8cbf4d31f6cf62da3c9d8bfb@35.213.141.64:26656,8fe3209d46d2cac8c7bd5522e0d845afa559f5cf@35.212.39.211:26656,345d5a9f4bebb6d820a507d218ceb6f8eeb4eaa1@35.210.54.75:26656,0246d7886093a2b013ca557a1acce7afde2d2d18@35.212.25.94:26656,5c3199e08a77f21ff7717863380ed43bca000fc6@35.210.104.70:26656,dc54f2f4295dffc51608f6f1bf2331e2c9ac6079@35.212.178.33:26656,cd6a68641b31d6988ddd45395e631bfa2af071ec@35.212.80.250:26656,256b36609c9aefc5d3251b29f657ffe368ca77d9@35.213.166.39:26656,5410302221084251132fe55262c40f2e6ae5c3a8@35.210.223.45:26656,184e2d4386144ea89df84177e6fff3f1be8dc7ea@35.212.178.24:26656,e5b6b3cfa9c4b549e81723a89222b20202bcef3d@35.210.152.80:26656,aa8def3250da070d0eb2340215218d8effc86df9@222.106.187.14:53500,d9f8be9edd95794e08a6447cfb8bc02ace551ff8@65.108.12.253:20007,4b1e5a8e64c6e66da1483010fba423648995ccb0@71.13.17.144:26656,15b51043c53b665d719fab1c630a80158d37e97e@35.213.189.166:26656,8ff1e1ea8c13020f3e23a5e86177e85d880c2431@49.12.84.248:13656,fffd730672f04d5dc065fa9afce2eb1d6bc4d150@35.212.60.28:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=184e2d4386144ea89df84177e6fff3f1be8dc7ea@35.212.178.24:26656,069d0293c718c96d8cbf4d31f6cf62da3c9d8bfb@35.213.141.64:26656,cf97b7d6a86c2dffefe0c4ee72748ff1dcedd713@35.213.156.49:26656,8ff1e1ea8c13020f3e23a5e86177e85d880c2431@49.12.84.248:13656,cd6a68641b31d6988ddd45395e631bfa2af071ec@35.212.80.250:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.band/config/config.toml

sudo systemctl restart band.service
sudo journalctl -fu band.service --no-hostname -o cat
```

## Our peer for Band
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
affbb71e130841e0c262efcd3d90ee71b16c59b2@band-t-rpc.noders.services:20656
```