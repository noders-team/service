---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-xrp">
# Upgrade
</div>
###### Chain ID: `exrp_1440002-1` | Current Node Version: `v7.0.0`

# With Cosmovisor
## Clone XRPL EVM repository
```js
cd $HOME
rm -rf node
git clone https://github.com/xrplevm/node.git
cd node
git checkout v7.0.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.exrpd/cosmovisor/upgrades/v7.0.0/bin
mv build/exrpd ~/.exrpd/cosmovisor/upgrades/v7.0.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone XRPL EVM repository
```js
cd $HOME
rm -rf node
git clone https://github.com/xrplevm/node.git
cd node
git checkout v7.0.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart exrpd && sudo journalctl -u exrpd -f --no-hostname -o cat
```