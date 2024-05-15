---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-archway">
# Upgrade
</div>
###### Chain ID: `archway-1` | Current Node Version: `v7.0.0`


# Clone Archway repository
```js
cd $HOME
rm -rf archway-network
git clone https://github.com/archway-network.git
cd archway-network
git checkout v7.0.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.archwayd/cosmovisor/upgrades/v7.0.0/bin
mv build/archwayd ~/.archwayd/cosmovisor/upgrades/v7.0.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Archway repository
```js
cd $HOME
rm -rf archway-network
git clone https://github.com/archway-network.git
cd archway-network
git checkout v7.0.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart archwayd && sudo journalctl -u archwayd -f --no-hostname -o cat
```