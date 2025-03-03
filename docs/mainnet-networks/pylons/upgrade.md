---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-pylons">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`


# Clone Pylons repository
```js
cd $HOME
rm -rf pylons
git clone https://github.com/Pylons-tech/pylons.git
cd pylons
git checkout auto
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.pylonsd/cosmovisor/upgrades/auto/bin
mv build/pylonsd ~/.pylonsd/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Pylons repository
```js
cd $HOME
rm -rf pylons
git clone https://github.com/Pylons-tech/pylons.git
cd pylons
git checkout auto
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart pylonsd && sudo journalctl -u pylonsd -f --no-hostname -o cat
```