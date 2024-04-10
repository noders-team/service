---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-warden">
# Live Peers
</div>
###### Chain ID: `alfama` | Current Node Version: `v0.2.0`

## All Live Peers for Warden
Here is a list of 16 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
89690e4abb78840ad172c8628a50570c9f484797@65.21.233.34:11656,ce520fdd9ad9d1d24fb5b3adcc065591f22fc770@65.108.206.118:46656,2581489669e7a297fcd9e9d2c050a177b8d82010@85.10.201.125:56656,e36da00d19dc793fa259d38f616bf1bccf950e10@65.21.255.161:26656,169c8c9b7eb1e9cde981bcfca51b5428e49dc01a@213.199.39.207:18656,ff0885377c44d58164f29d356b9d3d3a755c6213@65.108.231.124:18656,5cfb32d810d5d0bcfc0c07b9c6cc9795eca30b3e@173.249.56.79:26656,ccad66369a7907eb5dcb09dde610c133f6cc6366@45.13.226.108:26656,00c0b45d650def885fcbcc0f86ca515eceede537@152.53.18.245:15656,1e6d8b77c22b8f560599085137023222cfa3bdd5@89.117.72.163:26656,93607c604a96879f6ef09e7dbab3de40dbd40b0d@37.27.37.187:26656,187cb9dac4adefaa798f1a24a6219585d7a6f1fa@5.78.87.66:26656,ad461ac0415f8bf6f7449a716779c08752032d9f@173.249.39.87:11156,33b2a8a029ef26dd015093414e697b7db6a80eb3@149.102.155.8:26656,b9c77f2a0b725fb9b48b50e5ec50d100c58514af@165.232.87.163:26656,d58393a2343164b9fa76dddb06a8bcfb14f30bdf@115.75.120.208:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=e36da00d19dc793fa259d38f616bf1bccf950e10@65.21.255.161:26656,ad461ac0415f8bf6f7449a716779c08752032d9f@173.249.39.87:11156,b9c77f2a0b725fb9b48b50e5ec50d100c58514af@165.232.87.163:26656,ff0885377c44d58164f29d356b9d3d3a755c6213@65.108.231.124:18656,89690e4abb78840ad172c8628a50570c9f484797@65.21.233.34:11656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.warden/config/config.toml

sudo systemctl restart warden.service
sudo journalctl -fu warden.service --no-hostname -o cat
```

## Our peer for Warden
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
85b6f8c6d7ac2e1e66e50af9825210d23eb1f806@warden-t-rpc.noders.services:23656
```