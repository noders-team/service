---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-humans">
# Upgrade
</div>
###### Chain ID: `humans_1089-1` | Current Node Version: `v1.0.0`


# Clone Humans repository
```js
cd $HOME
rm -rf humansdotai
git clone https://github.com/humansdotai.git
cd humansdotai
git checkout v1.0.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.humansd/cosmovisor/upgrades/v1.0.0/bin
mv build/humansd ~/.humansd/cosmovisor/upgrades/v1.0.0/bin/
rm -rf build
```