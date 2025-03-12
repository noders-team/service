---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-celestia">
# Upgrade
</div>
###### Chain ID: `celestia` | Current Node Version: `v3.2.0`


# Clone Celestia repository
```js
cd $HOME
rm -rf celestia-app
git clone https://github.com/celestiaorg/celestia-app.git
cd celestia-app
git checkout v3.2.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.celestia-app/cosmovisor/upgrades/v3.2.0/bin
mv build/celestia-appd ~/.celestia-app/cosmovisor/upgrades/v3.2.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Celestia repository
```js
cd $HOME
rm -rf celestia-app
git clone https://github.com/celestiaorg/celestia-app.git
cd celestia-app
git checkout v3.2.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart celestia-appd && sudo journalctl -u celestia-appd -f --no-hostname -o cat
```