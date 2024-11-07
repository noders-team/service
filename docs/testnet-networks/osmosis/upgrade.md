---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-osmosis">
# Upgrade
</div>
###### Chain ID: `osmo-test-5` | Current Node Version: `26.0.0-rc3`

# With Cosmovisor
## Clone Osmosis repository
```js
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout 26.0.0-rc3
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.osmosisd/cosmovisor/upgrades/26.0.0-rc3/bin
mv build/osmosisd ~/.osmosisd/cosmovisor/upgrades/26.0.0-rc3/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Osmosis repository
```js
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout 26.0.0-rc3
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart osmosisd && sudo journalctl -u osmosisd -f --no-hostname -o cat
```