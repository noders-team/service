---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-band">
# Upgrade
</div>
###### Chain ID: `null` | Current Node Version: `v2.5.4`


# Clone Band repository
```js
cd $HOME
rm -rf chain
git clone https://github.com/bandprotocol/chain.git
cd chain
git checkout v2.5.4
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.band/cosmovisor/upgrades/v2.5.4/bin
mv build/bandd ~/.band/cosmovisor/upgrades/v2.5.4/bin/
rm -rf build
```