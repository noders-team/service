---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-og">
# Upgrade
</div>
###### Chain ID: `zgtendermint_16600-1` | Current Node Version: `v0.1.0`

# With Cosmovisor
## Clone ZeroGravity repository
```js
cd $HOME
rm -rf 0g-evmos
git clone https://github.com/0glabs/0g-evmos.git
cd 0g-evmos
git checkout v0.1.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.evmosd/cosmovisor/upgrades/v0.1.0/bin
mv build/evmosd ~/.evmosd/cosmovisor/upgrades/v0.1.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone ZeroGravity repository
```js
cd $HOME
rm -rf 0g-evmos
git clone https://github.com/0glabs/0g-evmos.git
cd 0g-evmos
git checkout v0.1.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart evmosd && sudo journalctl -u evmosd -f --no-hostname -o cat
```