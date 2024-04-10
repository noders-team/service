---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-celestia">
# Upgrade
</div>
###### Chain ID: `celestia` | Current Node Version: `v1.6.0`


# Clone Celestia repository
```js
cd $HOME
rm -rf celestiaorg
git clone https://github.com/celestiaorg.git
cd celestiaorg
git checkout v1.6.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.celestia-app/cosmovisor/upgrades/v1.6.0/bin
mv build/celestia-appd ~/.celestia-app/cosmovisor/upgrades/v1.6.0/bin/
rm -rf build
```