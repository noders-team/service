---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-lava">
# Upgrade
</div>
###### Chain ID: `lava-testnet-2` | Current Node Version: `1.0.1`


# Clone Lava repository
```js
cd $HOME
rm -rf lavanet
git clone https://github.com/lavanet.git
cd lavanet
git checkout 1.0.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.lava/cosmovisor/upgrades/1.0.1/bin
mv build/lavad ~/.lava/cosmovisor/upgrades/1.0.1/bin/
rm -rf build
```