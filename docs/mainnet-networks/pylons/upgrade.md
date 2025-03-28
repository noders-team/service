---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-pylons">
# Upgrade
</div>
###### Chain ID: `pylons-mainnet-1` | Current Node Version: `v1.1.4`


# Clone Pylons repository
```js
cd $HOME
rm -rf pylons
git clone https://github.com/Pylons-tech/pylons.git
cd pylons
git checkout v1.1.4
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.pylonsd/cosmovisor/upgrades/v1.1.4/bin
mv build/pylonsd ~/.pylonsd/cosmovisor/upgrades/v1.1.4/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Pylons repository
```js
cd $HOME
rm -rf pylons
git clone https://github.com/Pylons-tech/pylons.git
cd pylons
git checkout v1.1.4
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart pylonsd && sudo journalctl -u pylonsd -f --no-hostname -o cat
```