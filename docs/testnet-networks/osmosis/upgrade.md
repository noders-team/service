---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-osmosis">
# Upgrade
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `23.0.0`


# Clone Osmosis repository
```js
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout 23.0.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.osmosisd/cosmovisor/upgrades/23.0.0/bin
mv build/osmosisd ~/.osmosisd/cosmovisor/upgrades/23.0.0/bin/
rm -rf build
```