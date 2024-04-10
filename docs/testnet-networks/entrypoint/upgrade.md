---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-entrypoint">
# Upgrade
</div>
###### Chain ID: `entrypoint-pubtest-2` | Current Node Version: `1.3.0`


# Clone Entrypoint repository
```js
cd $HOME
rm -rf entrypoint-zone
git clone https://github.com/entrypoint-zone.git
cd entrypoint-zone
git checkout 1.3.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.entrypoint/cosmovisor/upgrades/1.3.0/bin
mv build/entrypointd ~/.entrypoint/cosmovisor/upgrades/1.3.0/bin/
rm -rf build
```