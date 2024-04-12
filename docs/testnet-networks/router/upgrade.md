---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-router">
# Upgrade
</div>
###### Chain ID: `router_9601-1` | Current Node Version: `v1.0.0-rc1`

# With Cosmovisor
## Clone Rrouter repository
```js
cd $HOME
rm -rf router-protocol
git clone https://github.com/router-protocol.git
cd router-protocol
git checkout v1.0.0-rc1
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.routerd/cosmovisor/upgrades/v1.0.0-rc1/bin
mv build/routerd ~/.routerd/cosmovisor/upgrades/v1.0.0-rc1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Rrouter repository
```js
cd $HOME
rm -rf router-protocol
git clone https://github.com/router-protocol.git
cd router-protocol
git checkout v1.0.0-rc1
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart routerd && sudo journalctl -u routerd -f --no-hostname -o cat
```