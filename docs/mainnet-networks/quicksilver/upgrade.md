---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-quicksilver">
# Upgrade
</div>
###### Chain ID: `quicksilver-2` | Current Node Version: `v1.5.4`


# Clone Quicksilver repository
```js
cd $HOME
rm -rf quicksilver-zone
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout v1.5.4
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.quicksilverd/cosmovisor/upgrades/v1.5.4/bin
mv build/quicksilverd ~/.quicksilverd/cosmovisor/upgrades/v1.5.4/bin/
rm -rf build
```