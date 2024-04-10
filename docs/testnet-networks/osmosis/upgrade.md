---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-osmosis">
# Upgrade
</div>
###### Chain ID: `osmo-test-5` | Current Node Version: `v24.0.0-rc0`


# Clone Osmosis repository
```js
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout v24.0.0-rc0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.osmosisd/cosmovisor/upgrades/v24.0.0-rc0/bin
mv build/osmosisd ~/.osmosisd/cosmovisor/upgrades/v24.0.0-rc0/bin/
rm -rf build
```