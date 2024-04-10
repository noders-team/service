---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-haqq">
# Upgrade
</div>
###### Chain ID: `haqq_11235-1` | Current Node Version: `v1.7.3`


# Clone Haqq repository
```js
cd $HOME
rm -rf haqq-network
git clone https://github.com/haqq-network.git
cd haqq-network
git checkout v1.7.3
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.haqqd/cosmovisor/upgrades/v1.7.3/bin
mv build/haqqd ~/.haqqd/cosmovisor/upgrades/v1.7.3/bin/
rm -rf build
```