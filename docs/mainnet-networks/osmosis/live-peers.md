---
hide_table_of_contents: false
title: Live peers*
sidebar_position: 5
---

# Live peers
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

## Osmosis Live Peers
Here is a list of 139 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
e25b12606d4fbb620f9d2323d7eb1d723095fdaf@65.108.238.29:21256,29c630185a46d71745e4de10d182bbdc28170761@[2a01:4f9:4a:2864::2]:12156,89b80c88a4d78035778035544c72fdc0ba5fb65d@65.109.24.82:39656,4cc9b42bb7428db352bbcba47238aadef2818444@135.181.210.171:4376,07e3af8b546c400c1936c74d614e4627f8ee38ef@144.76.74.73:28656,a9a19de09af8edf7f5dc86194961905a0632a462@88.198.27.51:60756,58487331c888bae15617441e91964e7a497ea574@141.94.240.156:14756,3219b5948e6aa5101c3130274b13ee0c06a96562@57.128.92.207:27402,6244c9d76cb26a4ff93b997379af4f2ed91a42ce@185.16.39.137:27126,217580420645df4bb2f02e33e97c264db5516b34@5.161.226.84:14756,2b3c34c6d3c20c02d07f856d17707bf576319fa2@147.135.31.22:21256,d2457a9bb1fe18de80bf3a6776e4be1a49cdbbde@18.227.48.210:26656,0a607ca589490863410285eed0ca66354912016e@206.125.33.62:26672,cee8d8b45d7760b05bbce6890474a85c5a0fdb22@15.235.187.108:26656,dca62b1537a2a52a365328b5503b0ab9239f8bd3@95.216.74.45:14756,3f19d57d0868431d244815a4ec2fe12cad9ee36c@172.105.156.20:26656,34e5b9a4567c2a07e5f2652ace77248efa8a8e3e@66.42.78.48:26656,c31597f216e8d7c4eded55aa2598a13716a69270@95.56.244.244:26656,ebc272824924ea1a27ea3183dd0b9ba713494f83@95.214.54.118:27126,864886d24035966ef3f27d10fe313fb5a428ce91@185.8.107.163:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects up to 5 random live peers.

```bash
PEERS=3040e414423013e271d7091133dfb59adc4f3e29@51.222.12.21:56656,adcc17f08300038aed8e0c6f9dcfcfcb3156eba1@134.65.192.192:26656,213b6ac4b64375570db88f01d6493c775bfdd1b6@5.78.85.94:26656,6f1c1ac91c0a0f9322744c6924008c9f34dd3723@135.125.75.198:26656,76303284b76e5a644f89f5b1a86e8eb1167206a4@65.109.27.253:36008
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.osmosisd/config/config.toml

sudo systemctl restart andromedad
sudo journalctl -u andromedad -f --no-hostname -o cat
```

## Ours Peer for Osmosis
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
2e6fb93b12f9cdff3a3cb69db3c93713e69df8f7@65.108.204.225:12556
```