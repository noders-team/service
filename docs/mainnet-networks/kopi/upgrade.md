---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-kopi">
# Upgrade
</div>
###### Chain ID: `luwak-1` | Current Node Version: `v20.1`


# Clone Kopi repository
```js
cd $HOME
rm -rf kopi
git clone https://github.com/kopi-money/kopi.git
cd kopi
git checkout v20.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.kopid/cosmovisor/upgrades/v20.1/bin
mv build/uxkp ~/.kopid/cosmovisor/upgrades/v20.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Kopi repository
```js
cd $HOME
rm -rf kopi
git clone https://github.com/kopi-money/kopi.git
cd kopi
git checkout v20.1
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart uxkp && sudo journalctl -u uxkp -f --no-hostname -o cat
```