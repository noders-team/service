---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-entrypoint">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

# With Cosmovisor
## Clone Entrypoint repository
```js
cd $HOME
rm -rf entrypoint-zone
git clone https://github.com/entrypoint-zone.git
cd entrypoint-zone
git checkout auto
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.entrypoint/cosmovisor/upgrades/auto/bin
mv build/entrypointd ~/.entrypoint/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Entrypoint repository
```js
cd $HOME
rm -rf entrypoint-zone
git clone https://github.com/entrypoint-zone.git
cd entrypoint-zone
git checkout auto
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart entrypointd && sudo journalctl -u entrypointd -f --no-hostname -o cat
```