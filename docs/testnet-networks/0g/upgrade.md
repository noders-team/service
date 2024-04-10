---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-0g">
# Upgrade
</div>
###### Chain ID: `zgtendermint_9000-1` | Current Node Version: `v1.0.0-testnet`


# Clone 0g repository
```js
cd $HOME
rm -rf 0g-evmos.git
git clone https://github.com/0glabs/0g-evmos.git.git
cd 0g-evmos.git
git checkout v1.0.0-testnet
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.evmosd/cosmovisor/upgrades/v1.0.0-testnet/bin
mv build/evmosd ~/.evmosd/cosmovisor/upgrades/v1.0.0-testnet/bin/
rm -rf build
```