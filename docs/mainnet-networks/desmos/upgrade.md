---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-desmos">
# Upgrade
</div>
###### Chain ID: `desmos-mainnet` | Current Node Version: `v7.0.1`


# Clone Desmos repository
```js
cd $HOME
rm -rf desmos-labs
git clone https://github.com/desmos-labs.git
cd desmos-labs
git checkout v7.0.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.desmos/cosmovisor/upgrades/v7.0.1/bin
mv build/desmos ~/.desmos/cosmovisor/upgrades/v7.0.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Desmos repository
```js
cd $HOME
rm -rf desmos-labs
git clone https://github.com/desmos-labs.git
cd desmos-labs
git checkout v7.0.1
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart desmos && sudo journalctl -u desmos -f --no-hostname -o cat
```