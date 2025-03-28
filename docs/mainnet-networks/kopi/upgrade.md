---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-kopi">
# Upgrade
</div>
###### Chain ID: `luwak-1` | Current Node Version: `v19`


# Clone Kopi repository
```js
cd $HOME
rm -rf kopi
git clone https://github.com/kopi-money/kopi.git
cd kopi
git checkout v19
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.kopid/cosmovisor/upgrades/v19/bin
mv build/uxkp ~/.kopid/cosmovisor/upgrades/v19/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Kopi repository
```js
cd $HOME
rm -rf kopi
git clone https://github.com/kopi-money/kopi.git
cd kopi
git checkout v19
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart uxkp && sudo journalctl -u uxkp -f --no-hostname -o cat
```