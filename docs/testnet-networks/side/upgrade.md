---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-side">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: ``


# Clone Side repository
```js
cd $HOME
rm -rf sideprotocol
git clone https://github.com/sideprotocol.git
cd sideprotocol
git checkout 
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.side/cosmovisor/upgrades//bin
mv build/sided ~/.side/cosmovisor/upgrades//bin/
rm -rf build
```