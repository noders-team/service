---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-stratos">
# Upgrade
</div>
###### Chain ID: `stratos-1` | Current Node Version: `v0.11.2`


# Clone Stratos repository
```js
cd $HOME
rm -rf stratos-chain
git clone https://github.com/stratosnet/stratos-chain.git
cd stratos-chain
git checkout v0.11.2
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.stchaind/cosmovisor/upgrades/v0.11.2/bin
mv build/stchaind ~/.stchaind/cosmovisor/upgrades/v0.11.2/bin/
rm -rf build
```