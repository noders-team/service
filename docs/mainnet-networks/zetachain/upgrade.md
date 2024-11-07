---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-zetachain">
# Upgrade
</div>
###### Chain ID: `zetachain_7000-1` | Current Node Version: `v20.0.2`


# Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout v20.0.2
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.zetacored/cosmovisor/upgrades/v20.0.2/bin
mv build/zetacored ~/.zetacored/cosmovisor/upgrades/v20.0.2/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Zetachain repository
```js
cd $HOME
rm -rf zeta-chain
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout v20.0.2
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart zetacored && sudo journalctl -u zetacored -f --no-hostname -o cat
```