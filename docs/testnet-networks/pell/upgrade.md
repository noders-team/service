---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-pell">
# Upgrade
</div>
###### Chain ID: `ignite_186-1` | Current Node Version: `v1.3.0`

# With Cosmovisor
## Clone Pell repository
```js
cd $HOME
rm -rf 0xPellNetwork
git clone https://github.com/0xPellNetwork.git
cd 0xPellNetwork
git checkout v1.3.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.pellcored/cosmovisor/upgrades/v1.3.0/bin
mv build/pellcored ~/.pellcored/cosmovisor/upgrades/v1.3.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Pell repository
```js
cd $HOME
rm -rf 0xPellNetwork
git clone https://github.com/0xPellNetwork.git
cd 0xPellNetwork
git checkout v1.3.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart pellcored && sudo journalctl -u pellcored -f --no-hostname -o cat
```