---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-uptick">
# Upgrade
</div>
###### Chain ID: `uptick_117-1` | Current Node Version: `v0.2.19`


# Clone Uptick repository
```js
cd $HOME
rm -rf UptickNetwork
git clone https://github.com/UptickNetwork.git
cd UptickNetwork
git checkout v0.2.19
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.uptickd/cosmovisor/upgrades/v0.2.19/bin
mv build/uptickd ~/.uptickd/cosmovisor/upgrades/v0.2.19/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Uptick repository
```js
cd $HOME
rm -rf UptickNetwork
git clone https://github.com/UptickNetwork.git
cd UptickNetwork
git checkout v0.2.19
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart uptickd && sudo journalctl -u uptickd -f --no-hostname -o cat
```