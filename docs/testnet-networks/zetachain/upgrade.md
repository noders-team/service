---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-zetachain">
# Upgrade
</div>
###### Chain ID: `athens_7001-1` | Current Node Version: `v15`


# Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout v15
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.zetacored/cosmovisor/upgrades/v15/bin
mv build/zetacored ~/.zetacored/cosmovisor/upgrades/v15/bin/
rm -rf build
```