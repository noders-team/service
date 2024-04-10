---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-jackal">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `null`


# Clone Jackal repository
```js
cd $HOME
rm -rf canine-chain
git clone https://github.com/JackalLabs/canine-chain.git
cd canine-chain
git checkout null
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.canine/cosmovisor/upgrades/null/bin
mv build/canined ~/.canine/cosmovisor/upgrades/null/bin/
rm -rf build
```