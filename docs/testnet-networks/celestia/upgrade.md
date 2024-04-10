---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-celestia">
# Upgrade
</div>
###### Chain ID: `mocha-4` | Current Node Version: `1.7.0`


# Clone Celestia repository
```js
cd $HOME
rm -rf celestiaorg
git clone https://github.com/celestiaorg.git
cd celestiaorg
git checkout 1.7.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.celestia-app/cosmovisor/upgrades/1.7.0/bin
mv build/celestia-appd ~/.celestia-app/cosmovisor/upgrades/1.7.0/bin/
rm -rf build
```