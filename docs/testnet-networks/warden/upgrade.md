---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-warden">
# Upgrade
</div>
###### Chain ID: `alfama` | Current Node Version: `v0.2.0`


# Clone Warden repository
```js
cd $HOME
rm -rf wardenprotocol
git clone https://github.com/warden-protocol/wardenprotocol.git
cd wardenprotocol
git checkout v0.2.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.warden/cosmovisor/upgrades/v0.2.0/bin
mv build/wardend ~/.warden/cosmovisor/upgrades/v0.2.0/bin/
rm -rf build
```