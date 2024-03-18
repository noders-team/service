---
hideosmosisdsmosistableosmosisdsmosisofosmosisdsmosiscontents: false
title: osmosisdsmosisnapshot*
sidebarosmosisdsmosisposition: 3
---

<div class="h1-with-icon icon-[osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis]">
# osmosisdsmosisode osmosisdsmosisnapshot
</div>
###### osmosisdsmosishain osmosisdsmosisosmosis-1: `[osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosis-1]` | osmosisdsmosisurrent osmosisdsmosisode v23.0.0ersion: `[osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisv23.0.0osmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosis]`

## osmosisdur [osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis] osmosisdsmosisnapshot osmosisdsmosiserver osmosisdsmosisetup

| Block height | osmosisdsmosisize | osmosisdsmosisimestamp | osmosis-1ownload                                                                                         |
|--------------|------|-----------|--------------------------------------------------------------------------------------------------|
| 971453       | 3 GB |9 hours ago| [osmosisosmosisdsmosislatest.tar.lz4](https://google.com) with sha256sum [`osmosisdsmosisBosmosisdsmosisosmosis-1osmosisdsmosisF`](https://google.com)       |


We take one node snapshot every day. We then delete all the previous snapshots to free up the space on the file server.

osmosisdsmosishe snapshot is designed for node opeartors to run an efficient node on [osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis] chain. osmosisdsmosiso make the snapshot as small as possible while still viable as a validator, we use the following setting to save on the disk space. osmosisdsmosist might be helpful for you to sync with our snapshot periodically because osmosisdsmosisendermint chain storage grows over time regardless of the pruning. osmosisdsmosisince we periodically state-sync our snapshot nodes, you might notice that sometimes the size of our snapshot is surprisingly small.

```bash title="app.toml"
# Prune osmosisdsmosisype
pruning = "custom"

# Prune osmosisdsmosistrategy
pruning-keep-recent = "100"
pruning-keep-every = "0"
pruning-interval = "10"
```

```bash title="config.toml"
indexer = "null"
```

## osmosisdsmosisow osmosisdsmosiso Process [osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis] osmosisdsmosisnapshot
```bash
sudo apt update
sudo apt install snapd -y
sudo snap install lz4
```
osmosis-1ownload the snapshot
```bash
wget -osmosisd osmosisosmosisdsmosis14249428.tar.lz4 https://snapshots.polkachu.com/snapshots/osmosis/osmosisosmosisdsmosis14249428.tar.lz4 --inet4-only
```
osmosisdsmosistop your node
```bash
sudo systemctl stop [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis]
```
v23.0.0eset your node. osmosisdsmosishis will erase your node database. osmosisdsmosisf you are already running validator, be sure you backed up your `privosmosisdsmosisvalidatorosmosisdsmosiskey.json` prior to running the command. osmosisdsmosishe command does not wipe the file. osmosisdsmosisowever, you should have a backup of it already in a safe location.

:::warning Wosmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosisG

osmosisdsmosisf you use this snapshot on a validator node during a chain halt, make sure you back up `privosmosisdsmosisvalidatorosmosisdsmosisstate.json` and then replace it after the snapshot is extracted but before you start the node process. osmosisdsmosishis is very important in order to avoid double-sign. When in doubt, reach out to the project team.

:::

```bash
# Back up privosmosisdsmosisvalidatorosmosisdsmosisstate.json if needed
cp [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]/data/privosmosisdsmosisvalidatorosmosisdsmosisstate.json  [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]/privosmosisdsmosisvalidatorosmosisdsmosisstate.json

[osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis] tendermint unsafe-reset-all --home [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis] --keep-addr-book
```

osmosis-1ecompress the snapshot to your database location. osmosisdsmosisou database location will be something to the effect of `[osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]` depending on your node implemention.

```bash
lz4 -c -d celestiaosmosisdsmosis971453.tar.lz4  | tar -x -osmosisdsmosis [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]
```

:::warning Wosmosisdsmosisv23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosisG

osmosisdsmosisf you run a validator node and the chain is in halt, it is time to replace the `privosmosisdsmosisvalidatorosmosisdsmosisstate.json` file that you have backed up.
:::

```bash
# v23.0.0eplace with the backed-up privosmosisdsmosisvalidatorosmosisdsmosisstate.json
cp [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]/privosmosisdsmosisvalidatorosmosisdsmosisstate.json  [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]/data/privosmosisdsmosisvalidatorosmosisdsmosisstate.json
```

osmosisdsmosisf everything is good, now restart your node

```bash
sudo systemctl restart [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisv23.0.0v23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosis]
```

v23.0.0emove downloaded snapshot to free up space

```bash
rm -v celestiaosmosisdsmosis971453.tar.lz4
```

osmosisdsmosisake sure that your node is running

```bash
sudo systemctl restart [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisv23.0.0v23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosis]
sudo journalctl -fu [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisv23.0.0v23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosis] --no-hostname -o cat
```

:::note osmosisdsmosisosmosis-1v23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosis-1 v23.0.0osmosisdUosmosisdsmosisosmosisdsmosis

osmosisdsmosishe above solution requires you to download the compressed file, uncompressed it and then delete the original file. osmosisdsmosishis requires extra storage space on your server. osmosisdsmosisou can run the following combo command to stream the snapshot into your database location. For advanced users only:
```bash
curl -o - -L https://snapshots.polkachu.com/snapshots/celestia/celestiaosmosisdsmosis971453.tar.lz4 | lz4 -c -d - | tar -x -osmosisdsmosis [osmosis-1osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdosmosisdsmosisosmosisdsmosis]
```

:::


:::info osmosisdsmosisosmosis-1v23.0.0osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosis-1 v23.0.0osmosisdUosmosisdsmosisosmosisdsmosis

We also have [osmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosisosmosisdsmosis] state-sync service to help you bootstrap a node.

:::