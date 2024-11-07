---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-quicksilver">
# Live Peers
</div>
###### Chain ID: `rhye-2` | Current Node Version: `v1.6.1-health`

## All Live Peers for Quicksilver
Here is a list of 11 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
41eed5cd425a67fff4ce81084e217e470fd76344@85.10.197.17:33656,f6f1e4a0baf856ff7d7f6d12868a201282914314@65.109.89.5:30656,e609b37b985884fcce72a3022b70450797d18f53@185.196.20.28:11656,0265044736c3b59fb4982f3650cadebe457df561@167.86.99.7:16656,8a334ed2e728ca1164f8ef6ae58dd5fda31da5be@190.2.146.152:28656,1c1ca90d704c22844570d57039ccf2e8f58e475d@80.64.208.123:26656,c3819ce50237e206e0c83eb1702423e85f9270ed@5.161.145.173:26656,c14064515ca86349d29f0d4b8d646404014bf97b@195.3.222.20:14656,a2545366cc842d50f2aff732b9caae881a729b79@65.109.154.182:11156,3a426c678dc8d4abe621c6cc50011624091710fe@92.255.196.146:26656,67478d2ed90c086598b989e2196f2eae2308aa2b@94.130.164.82:11156
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=0265044736c3b59fb4982f3650cadebe457df561@167.86.99.7:16656,3a426c678dc8d4abe621c6cc50011624091710fe@92.255.196.146:26656,8a334ed2e728ca1164f8ef6ae58dd5fda31da5be@190.2.146.152:28656,f6f1e4a0baf856ff7d7f6d12868a201282914314@65.109.89.5:30656,e609b37b985884fcce72a3022b70450797d18f53@185.196.20.28:11656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.quicksilverd/config/config.toml

sudo systemctl restart quicksilverd
sudo journalctl -fu quicksilverd --no-hostname -o cat
```

## Our peer for Quicksilver
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
30e054bce2e72334fcc3af90aa6985cc55eaec7a@quicksilver-t-rpc.noders.services:13656
```