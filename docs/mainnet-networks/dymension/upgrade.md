---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-dymension">
# Upgrade
</div>
###### Chain ID: `dymension_1100-1` | Current Node Version: `v3.0.0`


# Clone Dymension repository
```js
cd $HOME
rm -rf dymensionxyz
git clone https://github.com/dymensionxyz.git
cd dymensionxyz
git checkout v3.0.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.dymension/cosmovisor/upgrades/v3.0.0/bin
mv build/dymd ~/.dymension/cosmovisor/upgrades/v3.0.0/bin/
rm -rf build
```