---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-router">
# Upgrade
</div>
###### Chain ID: `router_9601-1` | Current Node Version: `vnull`


# Clone Rrouter repository
```js
cd $HOME
rm -rf router-protocol
git clone https://github.com/router-protocol.git
cd router-protocol
git checkout vnull
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.routerd/cosmovisor/upgrades/vnull/bin
mv build/routerd ~/.routerd/cosmovisor/upgrades/vnull/bin/
rm -rf build
```