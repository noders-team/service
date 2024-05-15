---
hide_table_of_contents: false
title: Snapshot
sidebar_position: 3
---

<div class="h1-with-icon icon-osmosis">
# Node Snapshot
</div>
###### Chain ID: `osmo-test-5` | Current Node Version: `v25.0.0-rc0`

## Our Osmosis Snapshot Server Setup

| Size   | Timestamp    |
|--------|--------------|
| 52.25 GB | Wed, 15 May 2024 07:07:41 GMT  |


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

cd $HOME
sudo rm -rf ~/.osmosisd/data
sudo rm -rf ~/.osmosisd/wasm
```

Decompress the snapshot to your database location. You database location will be something to the effect of `~/.osmosisd` depending on your node implemention.

The above solution requires you to download the compressed file, uncompressed it and then delete the original file. This requires extra storage space on your server. You can run the following combo command to stream the snapshot into your database location. For advanced users only:
### Data
```bash
curl -o - -L https://config-t.noders.services/osmosis/data.tar.lz4 | lz4 -d | tar -x -C ~/.osmosisd
```
### Wasm
```bash
curl -o - -L https://config-t.noders.services/osmosis/wasm.tar.lz4 | lz4 -d | tar -x -C ~/.osmosisd
```

:::warning WARNING

If you run a validator node and the chain is in halt, it is time to replace the `priv_validator_state.json` file that you have backed up.
:::

```bash
# Replace with the backed-up priv_validator_state.json
cp ~/.osmosisd/priv_validator_state.json  ~/.osmosisd/data/priv_validator_state.json
```

If everything is good, now restart your node
Make sure that your node is running

```bash
sudo systemctl restart osmosisd
sudo journalctl -fu osmosisd --no-hostname -o cat
```

:::info ADVANCED ROUTE

We also have Osmosis state-sync service to help you bootstrap a node.

:::
