---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-galactica">
# Upgrade
</div>
###### Chain ID: `galactica_9302-1` | Current Node Version: `v0.1.2`


# Clone Galactica repository
```js
cd $HOME
rm -rf networks
git clone https://github.com/Galactica-corp/networks.git
cd networks
git checkout v0.1.2
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.galactica/cosmovisor/upgrades/v0.1.2/bin
mv build/galacticad ~/.galactica/cosmovisor/upgrades/v0.1.2/bin/
rm -rf build
```