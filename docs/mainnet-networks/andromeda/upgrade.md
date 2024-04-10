---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-andromeda">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v`


# Clone Andromeda repository
```js
cd $HOME
rm -rf andromedaprotocol
git clone https://github.com/andromedaprotocol.git
cd andromedaprotocol
git checkout v
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.andromeda/cosmovisor/upgrades/v/bin
mv build/andromedad ~/.andromeda/cosmovisor/upgrades/v/bin/
rm -rf build
```