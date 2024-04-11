---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-union">
# Upgrade
</div>
###### Chain ID: `union-testnet-6` | Current Node Version: `vnull`

# With Cosmovisor
## Clone Union repository
```js
cd $HOME
rm -rf unionlabs
git clone https://github.com/unionlabs.git
cd unionlabs
git checkout vnull
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.union/cosmovisor/upgrades/vnull/bin
mv build/uniond ~/.union/cosmovisor/upgrades/vnull/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Union repository
```js
cd $HOME
rm -rf unionlabs
git clone https://github.com/unionlabs.git
cd unionlabs
git checkout vnull
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart uniond && sudo journalctl -u uniond -f --no-hostname -o cat
```