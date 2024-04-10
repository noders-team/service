---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-kyve">
# Upgrade
</div>
###### Chain ID: `kyve-1` | Current Node Version: `v1.4.0`


# Clone Kyve repository
```js
cd $HOME
rm -rf KYVENetwork
git clone https://github.com/KYVENetwork.git
cd KYVENetwork
git checkout v1.4.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.kyve/cosmovisor/upgrades/v1.4.0/bin
mv build/kyved ~/.kyve/cosmovisor/upgrades/v1.4.0/bin/
rm -rf build
```