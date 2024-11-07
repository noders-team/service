---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-zetachain">
# Upgrade
</div>
###### Chain ID: `athens_7001-1` | Current Node Version: `v22.0.0`

# With Cosmovisor
## Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout v22.0.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.zetacored/cosmovisor/upgrades/v22.0.0/bin
mv build/zetacored ~/.zetacored/cosmovisor/upgrades/v22.0.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout v22.0.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart zetacored && sudo journalctl -u zetacored -f --no-hostname -o cat
```