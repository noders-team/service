---
hide_table_of_contents: false
title: Live peers
sidebar_position: 6
---

<div class="h1-with-icon icon-entrypoint">
# Live Peers
</div>
###### Chain ID: `entrypoint-pubtest-2` | Current Node Version: `v1.3.0`

## All Live Peers for Entrypoint
Here is a list of 21 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
869b3b499faf03a2d66e16baf1662b9f1d79bde8@65.108.132.239:25656,5e6af181ebf7f4ded2da56b004813ae70ba4f635@49.12.123.87:21116,789cde4999f30b41b950a23d8d012db3d8903ef3@158.220.108.166:10656,826a291f1a5f04a1779f2b1c7d6cb3683634b9b2@62.171.173.150:34656,54f4ba39ff98730bf92112a04e7bdf6cb3cec4de@167.86.98.98:26656,9bf58af93fbb6ee05612b3b7348933217bf335ed@217.76.53.171:12956,6e38397e09a2755841e2f350ba1ff8883a66551a@2a01:11556,f7af71e7f32516f005192b21f1a83ca3f4fef4da@142.132.202.92:32256,4ec9c508297c528a7713ba5a95fc754a43ace3c4@116.105.188.164:37656,7048ee28300ffa81103cd24b2af3d1af0c378def@195.201.197.4:34656,ba2648fe305c01c5276bf5bba2dffc2053e6bcb8@95.217.40.230:22226,75e83d67504cbfacdc79da55ca46e2c4353816e7@65.109.92.241:3106,05419a6f8cc137c4bb2d717ed6c33590aaae022d@213.133.100.172:26878,a1583f1ba0f0f8b91bd163110b0bfd709604b266@65.108.206.118:61256,b17f3f6a57a42081749c8f580af3567b5646f0bf@2406:26646,e1a1ac9ecd04f051fad5dd8bd128f67bdea0745e@80.79.6.202:22656,49db17efc0e026b3ffbcba003a99eacce3f02ff5@65.109.112.88:24456,31f077b8aa29a8e7712720cbb427750d011b6c1f@144.217.68.182:19656,3435c1a1956ae26167672b7d66e03348be256031@86.111.48.25:26656,e1b2eddac829b1006eb6e2ddbfc9199f212e505f@65.108.231.124:34656,d611ab85ec6193cb48a74cec6179a97b9b9bdef9@65.109.93.58:42656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=d611ab85ec6193cb48a74cec6179a97b9b9bdef9@65.109.93.58:42656,31f077b8aa29a8e7712720cbb427750d011b6c1f@144.217.68.182:19656,6e38397e09a2755841e2f350ba1ff8883a66551a@2a01:11556,b17f3f6a57a42081749c8f580af3567b5646f0bf@2406:26646,75e83d67504cbfacdc79da55ca46e2c4353816e7@65.109.92.241:3106
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.entrypoint/config/config.toml

sudo systemctl restart entrypoint.service
sudo journalctl -fu entrypoint.service --no-hostname -o cat
```

## Our peer for Entrypoint
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
955890d4ded935a973e0637983e80d6bdcafbe83@entrypoint-t-rpc.noders.services:15656
```