---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-side">
# Upgrade
</div>
###### Chain ID: `sidechain-testnet-4` | Current Node Version: `v0.9.4`

# With Cosmovisor
## Clone Side repository
```js
cd $HOME
rm -rf sideprotocol
git clone https://github.com/sideprotocol.git
cd sideprotocol
git checkout v0.9.4
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.side/cosmovisor/upgrades/v0.9.4/bin
mv build/sided ~/.side/cosmovisor/upgrades/v0.9.4/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Side repository
```js
cd $HOME
rm -rf sideprotocol
git clone https://github.com/sideprotocol.git
cd sideprotocol
git checkout v0.9.4
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart sided && sudo journalctl -u sided -f --no-hostname -o cat
```