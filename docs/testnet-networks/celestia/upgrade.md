---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-celestia">
# Upgrade
</div>
###### Chain ID: `mocha-4` | Current Node Version: `3.8.1-mocha`

# With Cosmovisor
## Clone Celestia repository
```js
cd $HOME
rm -rf celestia-app
git clone https://github.com/celestiaorg/celestia-app.git
cd celestia-app
git checkout 3.8.1-mocha
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.celestia-app/cosmovisor/upgrades/3.8.1-mocha/bin
mv build/celestia-appd ~/.celestia-app/cosmovisor/upgrades/3.8.1-mocha/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Celestia repository
```js
cd $HOME
rm -rf celestia-app
git clone https://github.com/celestiaorg/celestia-app.git
cd celestia-app
git checkout 3.8.1-mocha
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart celestia-appd && sudo journalctl -u celestia-appd -f --no-hostname -o cat
```