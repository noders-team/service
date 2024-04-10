---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-side">
# Upgrade
</div>
###### Chain ID: `side-testnet-3` | Current Node Version: `v0.7.0-rc2`


# Clone Side repository
```js
cd $HOME
rm -rf sideprotocol
git clone https://github.com/sideprotocol.git
cd sideprotocol
git checkout v0.7.0-rc2
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.side/cosmovisor/upgrades/v0.7.0-rc2/bin
mv build/sided ~/.side/cosmovisor/upgrades/v0.7.0-rc2/bin/
rm -rf build
```