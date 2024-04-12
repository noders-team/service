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
Here is a list of 26 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
4b5777664aacfeeb76a51dea8d1264c2983e6aed@65.109.104.111:56103,33b2a8a029ef26dd015093414e697b7db6a80eb3@149.102.155.8:26656,f40907b024c0bb2020654abf4171661e2d01b3bb@31.220.87.17:26666,00c0b45d650def885fcbcc0f86ca515eceede537@152.53.18.245:15656,afede188ca76320b6fe7560560ede13ef63d8b8d@89.117.51.142:26686,ce520fdd9ad9d1d24fb5b3adcc065591f22fc770@65.108.206.118:46656,89690e4abb78840ad172c8628a50570c9f484797@65.21.233.34:11656,e36da00d19dc793fa259d38f616bf1bccf950e10@65.21.255.161:26656,651244365bd6cbde014303c7349461c6f37b0ff8@143.110.156.86:26656,ff0885377c44d58164f29d356b9d3d3a755c6213@65.108.231.124:18656,12caf2f5e3618cb6c57f45e93ac713b2bc6243b1@164.90.205.67:26656,d9adc2a28643623294b0ba8b50090f92f768a50d@37.27.36.208:26656,f25b7d46046a7247b444ea59014bacf79f0a676d@79.117.27.218:26656,ccad66369a7907eb5dcb09dde610c133f6cc6366@45.13.226.108:26656,04f7b4ad5a7dc73cf1679afb86697ad63bac7f24@84.247.178.99:11156,a1f300b2049d4a758d6e40549c87a9812f21c4de@51.222.248.225:10656,4a926f24325ece861051fae1b020e8bde383f478@161.97.72.95:26656,64a194480f68e5e843157e423956503b1e711bd5@167.86.77.249:26656,5515f06d36f7438aa35bb045859efea8073cbfbf@65.21.199.230:26656,cb37adcb4aa8ada67ea0d62ee54dc0c02d73b462@194.163.150.31:18656,3520e49f7b083ea904a39fd7e8bf19afc08f480d@173.212.193.212:26686,187cb9dac4adefaa798f1a24a6219585d7a6f1fa@5.78.87.66:26656,c09232e6920506cda5d12cfaeb4e242d97fcb9f1@185.107.56.220:26656,1fb2d34932dc311f502c7b20c0713c9afd102317@195.3.222.117:61456,6a55cd0c902196546e634d684ff870874e3abc8a@144.76.28.163:56656,2890cdd01796f419e37149b16b6a2788614dbc05@167.99.217.196:11156
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=c09232e6920506cda5d12cfaeb4e242d97fcb9f1@185.107.56.220:26656,64a194480f68e5e843157e423956503b1e711bd5@167.86.77.249:26656,d9adc2a28643623294b0ba8b50090f92f768a50d@37.27.36.208:26656,04f7b4ad5a7dc73cf1679afb86697ad63bac7f24@84.247.178.99:11156,ccad66369a7907eb5dcb09dde610c133f6cc6366@45.13.226.108:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.warden/config/config.toml

sudo systemctl restart warden.service
sudo journalctl -fu warden.service --no-hostname -o cat
```

## Our peer for Warden
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
85b6f8c6d7ac2e1e66e50af9825210d23eb1f806@warden-t-rpc.noders.services:23656
```