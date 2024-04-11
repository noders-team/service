---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-bera">
# Upgrade
</div>
###### Chain ID: `artio-80085` | Current Node Version: `v0.2.3-alpha-rc7`


# Clone Bera repository
```js
cd $HOME
rm -rf berachain
git clone https://github.com/berachain.git
cd berachain
git checkout v0.2.3-alpha-rc7
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.bera/cosmovisor/upgrades/v0.2.3-alpha-rc7/bin
mv build/berad ~/.bera/cosmovisor/upgrades/v0.2.3-alpha-rc7/bin/
rm -rf build
```