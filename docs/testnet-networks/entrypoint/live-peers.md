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
a1583f1ba0f0f8b91bd163110b0bfd709604b266@65.108.206.118:61256,ba2648fe305c01c5276bf5bba2dffc2053e6bcb8@95.217.40.230:22226,cb3e84e80679b0f62cab4f93d33658ba7624b907@194.60.201.251:26656,ecb6977cf060f0a17045d1c5903918ce6b7bbbe8@37.120.189.81:34656,81bf2ade773a30eccdfee58a041974461f1838d8@185.107.68.148:26656,d57c7572d58cb3043770f2c0ba412b35035233ad@80.64.208.169:26656,5e6af181ebf7f4ded2da56b004813ae70ba4f635@49.12.123.87:21116,05419a6f8cc137c4bb2d717ed6c33590aaae022d@213.133.100.172:26878,6e38397e09a2755841e2f350ba1ff8883a66551a@2a01:11556,f7af71e7f32516f005192b21f1a83ca3f4fef4da@142.132.202.92:32256,7048ee28300ffa81103cd24b2af3d1af0c378def@195.201.197.4:34656,75e83d67504cbfacdc79da55ca46e2c4353816e7@65.109.92.241:3106,49db17efc0e026b3ffbcba003a99eacce3f02ff5@65.109.112.88:24456,8ae2d5823b10354a9d6479c0a4c448c9d6118909@65.109.93.124:28256,86d3419fe4bf40af009fd4d8d134de81ed4f808c@192.81.216.38:26656,e1a1ac9ecd04f051fad5dd8bd128f67bdea0745e@80.79.6.202:22656,98a958f0316a3615f9a6ae4dcae87f20db237f8e@65.109.83.40:28256,e1b2eddac829b1006eb6e2ddbfc9199f212e505f@65.108.231.124:34656,b91b03c8e7089c265b14dba36c5a61da6ea40f4c@37.120.191.47:61056,4ec9c508297c528a7713ba5a95fc754a43ace3c4@14.236.154.198:37656
```

Here is a script for you to update `persistent_peers` setting in `config.toml`. Stale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
PEERS=ba2648fe305c01c5276bf5bba2dffc2053e6bcb8@95.217.40.230:22226,b91b03c8e7089c265b14dba36c5a61da6ea40f4c@37.120.191.47:61056,d57c7572d58cb3043770f2c0ba412b35035233ad@80.64.208.169:26656,7048ee28300ffa81103cd24b2af3d1af0c378def@195.201.197.4:34656,81bf2ade773a30eccdfee58a041974461f1838d8@185.107.68.148:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.entrypoint/config/config.toml

sudo systemctl restart entrypointd
sudo journalctl -fu entrypointd --no-hostname -o cat
```

## Our peer for Entrypoint
When you state-sync, you might also consider adding [NODERS]TEAM state-sync peer to your persistent_peers setting in `config.toml`.

```bash
955890d4ded935a973e0637983e80d6bdcafbe83@entrypoint-t-rpc.noders.services:15656
```
