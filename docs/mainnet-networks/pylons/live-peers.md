---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-pylons">
# Live Peers
</div>
###### Chain ID: `pylons-mainnet-1` | Current Node Version: `v1.1.4`

## All Live Peers for Pylons
Here is a list of 17 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
88842d9e1b2e95cdd95227ae6d952b0fa6290737@84.16.241.18:29656,6144bf581d89212bf294de31e66f94d628f09053@65.109.92.235:38656,ec0091eb96865721725a6668f65e1c7782149c35@65.21.45.173:16556,0f606f3fa1290d86e514a22a2b6a96ef4b58c70d@195.201.202.39:26666,71d84cfdcd616dd93c2831fdba5d8dbf228a2d6c@185.197.194.214:26656,3336e645081fcddb72917c017ae232fa6b7c8cf4@149.50.96.170:26656,99910196d78d5c6e4b658223109d721edcb9ee6b@138.201.85.176:26686,dcd20401417eabeec46297be26c93e2e0b3f029d@5.161.229.9:26656,738ce404cc42b7640b3d2b4a5f587d5e7ab63634@65.109.88.251:38656,71b2ccc335a2ed88854444d23c2f2e2fd343c7e9@65.109.52.156:9656,0496369603c974b14c612f4bdaf63c671340a108@109.205.182.224:37656,5eb57ba49c53dd6269e5afa9062265b0227886e5@144.76.45.59:26156,030e6a01aef8913bcee33b957e9204986203bc81@135.125.4.73:46656,f11c7596800a52b9585e54d7fc372c5b5f367c49@65.109.93.152:29656,252a2a9ddb4f30632e274447b4a37606c340742f@65.109.229.209:26656,93db1f716b4a956fb8627d857500a4c5af876df4@65.109.18.169:16556,b1a65b0ddb83fcec323f7bef50c7abbe95eec1ae@144.76.195.75:45256
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=71d84cfdcd616dd93c2831fdba5d8dbf228a2d6c@185.197.194.214:26656,030e6a01aef8913bcee33b957e9204986203bc81@135.125.4.73:46656,5eb57ba49c53dd6269e5afa9062265b0227886e5@144.76.45.59:26156,b1a65b0ddb83fcec323f7bef50c7abbe95eec1ae@144.76.195.75:45256,ec0091eb96865721725a6668f65e1c7782149c35@65.21.45.173:16556
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.pylonsd/config/config.toml

sudo systemctl restart pylonsd
sudo journalctl -fu pylonsd --no-hostname -o cat
```

## Our peer for Pylons
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
ae94eb20e73c0ad93dbb980338eb313320c56194@pylons-rpc.noders.services:23656
```
