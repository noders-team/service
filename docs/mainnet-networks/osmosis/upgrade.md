---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-osmosis">
# Upgrade
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.8-iavl-v1`


# Clone Osmosis repository
```js
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout v23.0.8-iavl-v1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.osmosisd/cosmovisor/upgrades/v23.0.8-iavl-v1/bin
mv build/osmosisd ~/.osmosisd/cosmovisor/upgrades/v23.0.8-iavl-v1/bin/
rm -rf build
```