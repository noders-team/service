---
hide_table_of_contents: false
title: Snapshot
sidebar_position: 4
---

<div class="h1-with-icon icon-rebus">
# Node Snapshot
</div>
###### Chain ID: `reb_1111-1` | Current Node Version: `v0.4.0`

## Our Rebus Snapshot Server Setup

| Size   | Timestamp   |
|--------|-------------|
| 2.72 GB | Thu, 11 Apr 2024 00:43:41 GMT |


We take one node snapshot every day. We then delete all the previous snapshots to free up the space on the file server.

The snapshot is designed for node opeartors to run an efficient node on Rebus chain. To make the snapshot as small as possible while still viable as a validator, we use the following setting to save on the disk space. It might be helpful for you to sync with our snapshot periodically because Tendermint chain storage grows over time regardless of the pruning. Since we periodically state-sync our snapshot nodes, you might notice that sometimes the size of our snapshot is surprisingly small.

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

## How To Process Rebus Snapshot
```bash
sudo apt update
sudo apt install snapd -y
sudo snap install lz4
```

Stop your node
```bash
sudo systemctl stop rebusd
```
Reset your node. This will erase your node database. If you are already running validator, be sure you backed up your `priv_validator_key.json` prior to running the command. The command does not wipe the file. However, you should have a backup of it already in a safe location.

:::warning WARNING

If you use this snapshot on a validator node during a chain halt, make sure you back up `priv_validator_state.json` and then replace it after the snapshot is extracted but before you start the node process. This is very important in order to avoid double-sign. When in doubt, reach out to the project team.

:::

```bash
# Back up priv_validator_state.json if needed
cp ~/.rebusd/data/priv_validator_state.json  ~/.rebusd/priv_validator_state.json

cd $HOME
sudo rm -rf ~/.rebusd/data
sudo rm -rf ~/.rebusd/wasm
```

Decompress the snapshot to your database location. You database location will be something to the effect of `~/.rebusd` depending on your node implemention.

The above solution requires you to download the compressed file, uncompressed it and then delete the original file. This requires extra storage space on your server. You can run the following combo command to stream the snapshot into your database location. For advanced users only:
### Data
```bash
curl -o - -L https://config.noders.services/rebus/data.tar.lz4 | lz4 -d | tar -x -C ~/.rebusd
```
### Wasm
```bash
Not supported
```

:::warning WARNING

If you run a validator node and the chain is in halt, it is time to replace the `priv_validator_state.json` file that you have backed up.
:::

```bash
# Replace with the backed-up priv_validator_state.json
cp ~/.rebusd/priv_validator_state.json  ~/.rebusd/data/priv_validator_state.json
```

If everything is good, now restart your node
Make sure that your node is running

```bash
sudo systemctl restart rebusd
sudo journalctl -fu rebusd --no-hostname -o cat
```

:::info ADVANCED ROUTE

We also have Rebus state-sync service to help you bootstrap a node.

:::
