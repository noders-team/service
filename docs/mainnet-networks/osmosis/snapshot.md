---
hide_table_of_contents: false
title: Snapshot
sidebar_position: 3
---

# Osmosis Node Snapshot
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

## Our Osmosis Snapshot Server Setup
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
sudo systemctl stop andromedad
```
Reset your node. This will erase your node database. If you are already running validator, be sure you backed up your `priv_validator_key.json` prior to running the command. The command does not wipe the file. However, you should have a backup of it already in a safe location.

:::warning WARNING

If you use this snapshot on a validator node during a chain halt, make sure you back up `priv_validator_state.json` and then replace it after the snapshot is extracted but before you start the node process. This is very important in order to avoid double-sign. When in doubt, reach out to the project team.

:::

```bash
# Back up priv_validator_state.json if needed
cp ~/.osmosisd/data/priv_validator_state.json  ~/.osmosisd/priv_validator_state.json

andromedad tendermint unsafe-reset-all --home $HOME/.andromeda --keep-addr-book
```
