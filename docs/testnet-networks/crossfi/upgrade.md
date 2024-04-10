---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-crossfi">
# Upgrade
</div>
###### Chain ID: `crossfi-evm-testnet-1` | Current Node Version: `0.3.0-prebuild3`


# Clone CrossFI repository
```js
cd $HOME
rm -rf crossfichain
git clone https://github.com/crossfichain.git
cd crossfichain
git checkout 0.3.0-prebuild3
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.mineplex-chain/cosmovisor/upgrades/0.3.0-prebuild3/bin
mv build/crossfid ~/.mineplex-chain/cosmovisor/upgrades/0.3.0-prebuild3/bin/
rm -rf build
```