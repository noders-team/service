---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-injective">
# Live Peers
</div>
###### Chain ID: `injective-1` | Current Node Version: `vnull`

## All Live Peers for Injective
Here is a list of 27 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
db1c47a8b178410702dc03ca202f04246e21230b@15.235.13.116:26656,bc5aa8479e26e96da82a6a37feaa62a014446e44@54.214.33.132:26656,ea4a1ad2676aaf1d137c934843cf4fbaf031d10a@149.50.102.46:14356,1d25f9768561a181c4ad42cd80219cc687b7cdbe@37.27.99.254:26656,68ed36be2c22c504d47b531421bc7be933eb0189@141.94.193.168:26656,a1e3d45171e46fd81bcae8e4b1e05263ee1c6fb3@211.211.123.158:26656,9855380b94adeab292068703a49912f52ee157da@54.148.216.185:26656,812b7236863e1ab369b46fd6dfabb294fe801f2a@44.214.37.79:26656,3519a502a9701fd08b0470ec509dfb234b8cbd4f@54.245.60.120:26656,204bd049353264547978853a8efb32e4521d8816@57.128.133.25:26656,61c88918832b352a1a930f56fc720890187411e6@116.202.234.242:26656,8812ac9869c053f66f37774801e8663b9fad73f1@193.84.3.31:14356,eccbb3b0bd774a97434cbf94f682c4495f2437b4@51.210.222.121:26656,23d0eea9bb42316ff5ea2f8b4cd8475ef3f35209@65.109.36.70:11751,ffc131ca4ad9460a2f6b833f237de770e6d4e247@141.95.169.132:14356,9188a1be12e245d98eebdeb8b4f70185b6beb5f5@167.235.48.220:26656,c98bb1b889ddb58b46e4ad3726c1382d37cd5609@65.109.51.80:11751,e69308ea385075d8cbd30492fce84acbf377b583@34.248.92.88:26656,4e79c5aea771120bc2ab0c0015483dd0aae8f7d4@54.188.171.197:26656,9b0bc5db28deac1d642665f13ec51aa6a56fdc8d@34.171.143.49:26656,4abc9ca0ad53a42fe51381635284f678b6edcb8a@65.109.56.166:14356,ee10c211a66028fffa005429be14a7175a4df877@65.21.8.230:14356,dd5336f3feebb66b9d6da9abe78f8842a537566f@82.113.38.36:26656,8f5603be95562a7c177a2395cb842e72390f7e7e@51.159.0.48:26656,b1897620dada8145048fc36482b48a01ade2dcc5@49.12.168.109:26656,0ce7837038407c79c5e878edea45150e1e0dd377@65.21.12.116:14356,1d6d64570bde5caca141e7b60832c819b635748c@52.30.132.101:26656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=9b0bc5db28deac1d642665f13ec51aa6a56fdc8d@34.171.143.49:26656,812b7236863e1ab369b46fd6dfabb294fe801f2a@44.214.37.79:26656,23d0eea9bb42316ff5ea2f8b4cd8475ef3f35209@65.109.36.70:11751,e69308ea385075d8cbd30492fce84acbf377b583@34.248.92.88:26656,dd5336f3feebb66b9d6da9abe78f8842a537566f@82.113.38.36:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.injectived/config/config.toml

sudo systemctl restart injectived.service
sudo journalctl -fu injectived.service --no-hostname -o cat
```

## Our peer for Injective
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
b96ce37010e0b3baa5020b536822ccba511c8f5f@injective-rpc.noders.services:33656
```