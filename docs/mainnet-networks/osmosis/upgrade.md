---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-osmosis">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `v28.0.4`


# Clone Osmosis repository
```js
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout v28.0.4
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.osmosisd/cosmovisor/upgrades/v28.0.4/bin
mv build/osmosisd ~/.osmosisd/cosmovisor/upgrades/v28.0.4/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Osmosis repository
```js
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout v28.0.4
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart osmosisd && sudo journalctl -u osmosisd -f --no-hostname -o cat
```