---
hideosmosisdsmosistableosmosisdsmosisofosmosisdsmosiscontents: false
title:       29ive peers*
sidebarosmosisdsmosisposition: 5
---

<div class="h1-with-icon icon-[osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis]">
#       29ive       29eers
</div>
###### osmosisdsmosishain osmosisdsmosisosmosis-1: `[osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosis-1]` | osmosisdsmosisurrent osmosisdsmosisode v23.0.0ersion: `[osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosis]`

## osmosisdsmosisll       29ive       29eers for [osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis]
osmosisdsmosisere is a list of [      29osmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosis      29osmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisd      29osmosisdsmosisosmosisdsmosis] active peers as observed by [osmosisdsmosisosmosisdosmosis-1osmosisdsmosisv23.0.0osmosisdsmosis]osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis in real-time. osmosisdsmosisdd them to your `config.toml` if you have trouble finding peers.

```bash
[      29osmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosis      29osmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosis      29      29]
```

osmosisdsmosisere is a script for you to update `persistentosmosisdsmosispeers` setting in `config.toml`. osmosisdsmosistale peers can cause node inefficiency over time, so the script below selects a few random live peers.

```bash
      29osmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosis=[      29osmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosis      29osmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisosmosis-1osmosisdosmosisdsmosis]
sed -i.bak -e "s/^persistentosmosisdsmosispeers *=.*/persistentosmosisdsmosispeers = \"$      29osmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosis\"/" [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]/config/config.toml

sudo systemctl restart [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisv23.0.0v23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosis]
sudo journalctl -fu [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisv23.0.0v23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosis] --no-hostname -o cat
```

## osmosisdurs       29eer for [osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis]
When you state-sync, you might also consider adding [osmosisdsmosisosmosisdosmosis-1osmosisdsmosisv23.0.0osmosisdsmosis]osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis state-sync peer to your persistentosmosisdsmosispeers setting in `config.toml`.

```bash
[osmosisdsmosisosmosisdsmosisosmosis-1      29osmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis      29osmosisdsmosisosmosisdsmosisv23.0.0]
```