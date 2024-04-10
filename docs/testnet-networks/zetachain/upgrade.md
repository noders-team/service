---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-zetachain">
# Upgrade
</div>
###### Chain ID: `athens_7001-1` | Current Node Version: `15`


# Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout 15
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.zetacored/cosmovisor/upgrades/15/bin
mv build/zetacored ~/.zetacored/cosmovisor/upgrades/15/bin/
rm -rf build
```