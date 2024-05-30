---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-lambda">
# Live Peers
</div>
###### Chain ID: `lambda_92000-1` | Current Node Version: `v1.0.1`

## All Live Peers for Lambda
Here is a list of 29 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
1393a8f981d142a7e14ea95d4fd80e0d21e295d5@176.38.51.58:60056,5f08283bdca097b7bbcbc454019c36acaaffa419@93.123.118.73:26656,b792f2a78ab42f4d2219f7141b0695ac567bbb16@5.9.70.101:26656,f2ae0d0d1d5911dd2c3d36b7de25fb469686c7c7@142.132.251.87:26656,76d210add1f2aacf2255ca8ff356398152f33b1d@142.132.156.99:31326,f890cd2b7b2911c9d82071da861aa36af7693038@65.108.70.119:44656,5a3dd7ea8d2bb3a76b760d4b2a425408401401f9@65.21.131.215:26556,27b098a6ed9c7760b78ef6a879e7ef98e4afce4c@78.46.18.44:12956,277b04415ee88113c304cc3970c88542d6d8f5d3@57.128.63.9:26656,0db4b1af2e7067ce1afd9ca3475192a500b1f008@46.4.23.225:27656,6ba9774fa3ede01badd157235efaab99f8607fc1@65.108.200.61:11554,e261d4cd31e1496a8678d709a5140d33cb88f080@165.73.108.227:26656,53e1c5f1783e839b1b1b51ae57ed2f05b9cdb4f3@13.229.27.15:26656,768563c9dedc605f1bcaface8404ff045ace2fc8@5.9.104.181:26656,0abc1161a0bb4cca2f155418c258426f6a2f1029@135.181.75.235:26656,3355eea0ea547428d71da6e4127377b924612e88@18.136.53.174:26656,975afec2ce27ef21eea9d512f68eac8487680b09@213.133.100.93:12956,52be999cce21f923d8253a88bcc51bafe2063fb3@37.120.191.47:56656,b55c192e7690125b3e803c6e7716aaf5200ad731@65.108.232.168:12656,b5fdbb9f95d7515d28de539c6406213e2d95d81f@176.36.21.140:60056,5d45b30ff95bf9be7bd95bdfef908a8304a75cb4@176.38.50.93:60056,a001b8608802de7e333620da76589ab1ed43c4ea@38.242.220.64:46656,2c4f8e193fd10ab3a2bc919b484fd1c78eceffb3@13.213.214.88:26656,43bbefd171623eb6ff2a4da9bc2bfa4fd8e2c534@65.21.134.202:26556,d24aa6ac0c2fdb02dce5703b660ba1e8ca80c384@65.108.134.215:33656,7d50fabbcfc6e2f87effb998e4119eec6c4032d2@35.77.106.98:26656,e3f1131bca284bcabac22440414439ac24b0c9a6@85.17.178.18:13656,d526363186bf7520589721187b89aee9ff42b221@135.181.210.171:31326,18a02b167912d419214b45cf4730fbf218590e48@176.36.248.34:50056
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=b792f2a78ab42f4d2219f7141b0695ac567bbb16@5.9.70.101:26656,b5fdbb9f95d7515d28de539c6406213e2d95d81f@176.36.21.140:60056,3355eea0ea547428d71da6e4127377b924612e88@18.136.53.174:26656,b55c192e7690125b3e803c6e7716aaf5200ad731@65.108.232.168:12656,f2ae0d0d1d5911dd2c3d36b7de25fb469686c7c7@142.132.251.87:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.lambdavm/config/config.toml

sudo systemctl restart lambdavm
sudo journalctl -fu lambdavm --no-hostname -o cat
```

## Our peer for Lambda
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
fd29375cb1bc8ed6088e65885a8d77eb15dfd272@lambda-rpc.noders.services:31656
```
