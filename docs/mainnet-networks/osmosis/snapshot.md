---
hide_table_of_contents: false
title: Snapshot*
sidebar_position: 3
---

<div class="h1-with-icon icon-Osmosis">
# Node Snapshot
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

## Our Osmosis Snapshot Server Setup

| Block height | Size | Timestamp | Download                                                                                         |
|--------------|------|-----------|--------------------------------------------------------------------------------------------------|
| 971453       | 3 GB |9 hours ago| [osmosis_latest.tar.lz4](https://google.com) with sha256sum [`ABCDEF`](https://google.com)       |


We take one node snapshot every day. We then delete all the previous snapshots to free up the space on the file server.

The snapshot is designed for node opeartors to run an efficient node on Osmosis chain. To make the snapshot as small as possible while still viable as a validator, we use the following setting to save on the disk space. It might be helpful for you to sync with our snapshot periodically because Tendermint chain storage grows over time regardless of the pruning. Since we periodically state-sync our snapshot nodes, you might notice that sometimes the size of our snapshot is surprisingly small.

```bash title="app.toml"
# Prune Type
pruning = "custom"

# Prune Strategy
pruning-keep-recent = "100"
pruning-keep-every = "0"
pruning-interval = "10"
```

```bash title="config.toml"
indexer = "null"
```

## How To Process Osmosis Snapshot
```bash
sudo apt update
sudo apt install snapd -y
sudo snap install lz4
```
Download the snapshot
```bash
wget -O osmosis_14249428.tar.lz4 https://snapshots.polkachu.com/snapshots/osmosis/osmosis_14249428.tar.lz4 --inet4-only
```
Stop your node
```bash
sudo systemctl stop osmosisd
```
Reset your node. This will erase your node database. If you are already running validator, be sure you backed up your `priv_validator_key.json` prior to running the command. The command does not wipe the file. However, you should have a backup of it already in a safe location.

:::warning WARNING

If you use this snapshot on a validator node during a chain halt, make sure you back up `priv_validator_state.json` and then replace it after the snapshot is extracted but before you start the node process. This is very important in order to avoid double-sign. When in doubt, reach out to the project team.

:::

```bash
# Back up priv_validator_state.json if needed
cp ~/.osmosisd/data/priv_validator_state.json  ~/.osmosisd/priv_validator_state.json

osmosisd tendermint unsafe-reset-all --home ~/.osmosisd --keep-addr-book
```

Decompress the snapshot to your database location. You database location will be something to the effect of `~/.osmosisd` depending on your node implemention.

```bash
lz4 -c -d celestia_971453.tar.lz4  | tar -x -C ~/.osmosisd
```

:::warning WARNING

If you run a validator node and the chain is in halt, it is time to replace the `priv_validator_state.json` file that you have backed up.
:::

```bash
# Replace with the backed-up priv_validator_state.json
cp ~/.osmosisd/priv_validator_state.json  ~/.osmosisd/data/priv_validator_state.json
```

If everything is good, now restart your node

```bash
sudo systemctl restart osmosisd.service
```

Remove downloaded snapshot to free up space

```bash
rm -v celestia_971453.tar.lz4
```

Make sure that your node is running

```bash
sudo systemctl restart osmosisd.service
sudo journalctl -fu osmosisd.service --no-hostname -o cat
```

:::note ADVANCED ROUTE

The above solution requires you to download the compressed file, uncompressed it and then delete the original file. This requires extra storage space on your server. You can run the following combo command to stream the snapshot into your database location. For advanced users only:
```bash
curl -o - -L https://snapshots.polkachu.com/snapshots/celestia/celestia_971453.tar.lz4 | lz4 -c -d - | tar -x -C ~/.osmosisd
```

:::


:::info ADVANCED ROUTE

We also have Osmosis state-sync service to help you bootstrap a node.

:::