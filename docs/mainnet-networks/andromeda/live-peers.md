---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-andromeda">
# Live Peers
</div>
###### Chain ID: `andromeda-1` | Current Node Version: `v0.1.1-fix-gov`

## All Live Peers for Andromeda
Here is a list of 29 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
e12127dd797b2d5737b22ad7f1d643819b23ef2d@135.181.222.33:21256,b11f979002d6e77062094e2fcf904d60755f59c4@141.95.66.199:27402,7a9fcc577ab367969aae5e23720faccca34d1ad9@95.214.55.138:27656,9c413b373cbb6532b63ed815be3778b4b454b910@51.210.223.80:21256,07a94536ca7bfe82367a044655085d933fd09b71@5.161.226.84:14756,0a607ca589490863410285eed0ca66354912016e@206.125.33.62:26672,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.108.233.103:14756,648292d05ab741f62e6add74ab4aabce2d6904e8@46.36.132.28:26656,7d012c8d2cb87ec26b301136a77dc6ad2222f591@178.162.165.154:26656,262f71fd6962cb793a17133870c194d16cf8198d@65.21.10.105:26656,2dd49a25f3550c1f194b5b9bda10f041e797b6f6@152.53.2.133:21256,a23fe8ccaf4fa2368a99ba7164629cbf4e2fd9a4@5.9.106.230:26656,2cb8390d40d864a4e1542ffb34312392568cc2d3@65.21.22.30:26656,d3ed63793226159799fc553a5a0a43800c6ba4c0@5.79.79.80:26656,8d4381bc53d341231c43bc13b2853adef5e27998@51.210.223.185:26656,1f0433e4aafbe98e8a6e6cb6a663464706e495ec@178.162.165.151:26656,f9eb390e4bf5f96ae0f841fcd772a5e493ddb6fb@162.19.94.39:26656,af019c6415f8fb9ee7ba432ad0e4de66f0cd1e19@51.91.215.27:26656,4cc9b42bb7428db352bbcba47238aadef2818444@135.181.210.171:4376,ebc272824924ea1a27ea3183dd0b9ba713494f83@95.214.54.118:27126,07e3af8b546c400c1936c74d614e4627f8ee38ef@144.76.74.73:28656,7a313867fb7df8e8c84c32ef35fd97a693eb4282@185.8.107.163:26656,76666dab586f4025cc6ce0669c0a90294619dd55@51.77.57.29:26656,8b8c1d57f27c98958619aa01eb4d3d54c3976b1e@65.108.201.167:37656,780c7854bedfddce99141576dd80d356f4b94f7e@8.210.46.65:26656,1f5bcc6c9d7d68886c936cb92bbefc40de75c361@47.243.243.235:26656,2b3c34c6d3c20c02d07f856d17707bf576319fa2@147.135.31.22:21256,9d6955d6661e00f609986706aa9458d310575efc@65.109.108.47:21256,9025add124d9c8f4321efa1c2bfb8fc95b034f49@65.21.10.181:21256
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=a23fe8ccaf4fa2368a99ba7164629cbf4e2fd9a4@5.9.106.230:26656,2cb8390d40d864a4e1542ffb34312392568cc2d3@65.21.22.30:26656,1f5bcc6c9d7d68886c936cb92bbefc40de75c361@47.243.243.235:26656,648292d05ab741f62e6add74ab4aabce2d6904e8@46.36.132.28:26656,b11f979002d6e77062094e2fcf904d60755f59c4@141.95.66.199:27402
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.andromeda/config/config.toml

sudo systemctl restart andromedad
sudo journalctl -fu andromedad --no-hostname -o cat
```

## Our peer for Andromeda
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
c1cde7020a3f96c7480702ede7ce470f4140bb8f@andromeda-rpc.noders.services:34656
```
