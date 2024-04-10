---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-bera">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v`


# Clone Bera repository
```js
cd $HOME
rm -rf berachain
git clone https://github.com/berachain.git
cd berachain
git checkout v
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.bera/cosmovisor/upgrades/v/bin
mv build/berad ~/.bera/cosmovisor/upgrades/v/bin/
rm -rf build
```