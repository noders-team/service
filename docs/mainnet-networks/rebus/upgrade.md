---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-rebus">
# Upgrade
</div>
###### Chain ID: `reb_1111-1` | Current Node Version: `v0.4.0`


# Clone Rebus repository
```js
cd $HOME
rm -rf rebuschain
git clone https://github.com/rebuschain.git
cd rebuschain
git checkout v0.4.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.rebusd/cosmovisor/upgrades/v0.4.0/bin
mv build/rebusd ~/.rebusd/cosmovisor/upgrades/v0.4.0/bin/
rm -rf build
```