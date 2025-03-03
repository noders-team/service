---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-zetachain">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

# With Cosmovisor
## Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout auto
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.zetacored/cosmovisor/upgrades/auto/bin
mv build/zetacored ~/.zetacored/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout auto
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart zetacored && sudo journalctl -u zetacored -f --no-hostname -o cat
```