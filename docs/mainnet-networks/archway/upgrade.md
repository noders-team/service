---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-archway">
# Upgrade
</div>
###### Chain ID: `archway-1` | Current Node Version: `v6.0.2`


# Clone Archway repository
```js
cd $HOME
rm -rf archway-network
git clone https://github.com/archway-network.git
cd archway-network
git checkout v6.0.2
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.archwayd/cosmovisor/upgrades/v6.0.2/bin
mv build/archwayd ~/.archwayd/cosmovisor/upgrades/v6.0.2/bin/
rm -rf build
```