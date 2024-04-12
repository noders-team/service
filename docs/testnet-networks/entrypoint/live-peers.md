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
Here is a list of 20 active peers as observed by [NODERS]TEAM in real-time. Add them to your `config.toml` if you have trouble finding peers.

```bash
e386ab31c10dba6875159e881d985810cf690501@65.109.30.35:34656,f76db792e02b2882e8456080d2a8bb1aabb103c7@2a01:20956,a1583f1ba0f0f8b91bd163110b0bfd709604b266@65.108.206.118:61256,f8d481f73c93a94ff442951ec84962ca0b5ce773@162.19.217.37:26656,5e6af181ebf7f4ded2da56b004813ae70ba4f635@49.12.123.87:21116,ddfc2adb179e4fdf7ad2dc9d6208885eefdc93ca@158.220.108.120:10656,fcdd0c5810ac038cb02c806a837296eab334959b@176.103.222.85:26656,1a54c65244018b2484a92172113b148a8855f559@91.144.171.205:20956,05419a6f8cc137c4bb2d717ed6c33590aaae022d@213.133.100.172:26878,ba2648fe305c01c5276bf5bba2dffc2053e6bcb8@95.217.40.230:22226,b17f3f6a57a42081749c8f580af3567b5646f0bf@2406:26646,7048ee28300ffa81103cd24b2af3d1af0c378def@195.201.197.4:34656,6e38397e09a2755841e2f350ba1ff8883a66551a@2a01:11556,75e83d67504cbfacdc79da55ca46e2c4353816e7@65.109.92.241:3106,f7af71e7f32516f005192b21f1a83ca3f4fef4da@142.132.202.92:32256,e1a1ac9ecd04f051fad5dd8bd128f67bdea0745e@80.79.6.202:22656,49db17efc0e026b3ffbcba003a99eacce3f02ff5@65.109.112.88:24456,e1b2eddac829b1006eb6e2ddbfc9199f212e505f@65.108.231.124:34656,31f077b8aa29a8e7712720cbb427750d011b6c1f@144.217.68.182:19656,d1d43cc7c7aef715957289fd96a114ecaa7ba756@65.21.198.100:20910
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=75e83d67504cbfacdc79da55ca46e2c4353816e7@65.109.92.241:3106,f8d481f73c93a94ff442951ec84962ca0b5ce773@162.19.217.37:26656,a1583f1ba0f0f8b91bd163110b0bfd709604b266@65.108.206.118:61256,49db17efc0e026b3ffbcba003a99eacce3f02ff5@65.109.112.88:24456,7048ee28300ffa81103cd24b2af3d1af0c378def@195.201.197.4:34656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.entrypoint/config/config.toml

sudo systemctl restart entrypoint.service
sudo journalctl -fu entrypoint.service --no-hostname -o cat
```

## Our peer for Entrypoint
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
955890d4ded935a973e0637983e80d6bdcafbe83@entrypoint-t-rpc.noders.services:15656
```