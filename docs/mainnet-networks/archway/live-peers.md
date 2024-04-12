---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-archway">
# Live Peers
</div>
###### Chain ID: `archway-1` | Current Node Version: `v6.0.2`

## All Live Peers for Archway
Here is a list of 25 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
50dcb63096601aea8f00637a36d835b1b0f5215a@65.109.115.49:26656,d9bfa29e0cf9c4ce0cc9c26d98e5d97228f93b0b@65.109.88.38:15656,6fc97bddf8d5323bd9938e26db8d6d4a53de6855@3.252.72.237:26656,bd9332cd0a99f5830ea457a32a56b32790f68716@135.181.58.28:27456,34999776ce08cb4298a9849609c4b43c78e8be37@65.108.238.203:25656,32c8f4217bc1a5fa13e61b6c7c1107a76e3798f1@104.128.62.172:26656,da90031d838fb687d04753d92326ab8387b5d305@77.120.115.156:26656,f2f65d215f529190e0d4fa99e88bfd095c6c5be8@135.181.138.95:2100,17c579988684ca167be22c59a0719715cb038422@5.9.100.26:3000,0eaaea39348aa6ebd0282e0dc7170b23c3588672@51.89.42.38:26656,68cac650b02d5f62fa1365cff979da7977abea26@65.109.33.48:26656,5324b0e96ba1268c4ad2894429e86848d8e205fa@37.27.100.232:11556,f752c2e456294ce267580bd890b99828271f8022@142.132.194.157:26756,910b79827b00e0394fd0eb65d8bea0f54802bce4@35.212.158.12:26656,9a1a576a6f06d1ae7545e7a5601d0b1bdce070cf@161.97.131.147:26660,49aa4097ae141c54816e42159af23290f2b26119@142.132.248.138:26816,261acb73f483d1cace653cb54f7b8815f63b7e56@54.36.227.1:26656,7d6c38e2ade98b181f0dfb98ac43cd83e3409d32@54.39.28.226:11556,f97a5c4779a46b717a1b6c017c372bcb7cc1469c@65.109.117.102:26656,35ca78766533566b758e04744c8c5c4eb9bacc13@44.214.37.79:26656,80a947787f6d13d00d54c29311dd2dead564f991@62.84.113.139:26656,d95243a6f0aea5b060908a20656b31c703a096f9@65.21.198.18:11556,a0eeed8ee23af8c546df55a177ec60661ab9ddc6@144.76.40.53:11556,34eb66b8e6ce78ff5de9ee111bf10d503d366170@65.108.76.28:11556,7e630475b43c9c7e648a0b1369b5811f8716de51@162.55.134.61:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=bd9332cd0a99f5830ea457a32a56b32790f68716@135.181.58.28:27456,0eaaea39348aa6ebd0282e0dc7170b23c3588672@51.89.42.38:26656,32c8f4217bc1a5fa13e61b6c7c1107a76e3798f1@104.128.62.172:26656,80a947787f6d13d00d54c29311dd2dead564f991@62.84.113.139:26656,49aa4097ae141c54816e42159af23290f2b26119@142.132.248.138:26816
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.archwayd/config/config.toml

sudo systemctl restart archwayd
sudo journalctl -fu archwayd --no-hostname -o cat
```

## Our peer for Archway
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
c4b36b605667e3896eb6f57c5d731519b89dfc6f@archway-rpc.noders.services:13656
```
