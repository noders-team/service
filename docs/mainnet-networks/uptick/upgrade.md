---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-uptick">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`


# Clone Uptick repository
```js
cd $HOME
rm -rf UptickNetwork
git clone https://github.com/UptickNetwork.git
cd UptickNetwork
git checkout auto
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.uptickd/cosmovisor/upgrades/auto/bin
mv build/uptickd ~/.uptickd/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Uptick repository
```js
cd $HOME
rm -rf UptickNetwork
git clone https://github.com/UptickNetwork.git
cd UptickNetwork
git checkout auto
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart uptickd && sudo journalctl -u uptickd -f --no-hostname -o cat
```