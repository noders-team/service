---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-atomone">
# Upgrade
</div>
###### Chain ID: `atomone-1` | Current Node Version: `v1.1.2`


# Clone Atomone repository
```js
cd $HOME
rm -rf atomone
git clone https://github.com/atomone-hub/atomone.git
cd atomone
git checkout v1.1.2
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.atomone/cosmovisor/upgrades/v1.1.2/bin
mv build/atomoned ~/.atomone/cosmovisor/upgrades/v1.1.2/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Atomone repository
```js
cd $HOME
rm -rf atomone
git clone https://github.com/atomone-hub/atomone.git
cd atomone
git checkout v1.1.2
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart atomoned && sudo journalctl -u atomoned -f --no-hostname -o cat
```