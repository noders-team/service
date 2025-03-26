---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-althea">
# Upgrade
</div>
###### Chain ID: `althea_258432-1` | Current Node Version: `v1.5.1`


# Clone Althea repository
```js
cd $HOME
rm -rf althea-chain
git clone https://github.com/althea-net/althea-chain.git
cd althea-chain
git checkout v1.5.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.althea/cosmovisor/upgrades/v1.5.1/bin
mv build/althea ~/.althea/cosmovisor/upgrades/v1.5.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Althea repository
```js
cd $HOME
rm -rf althea-chain
git clone https://github.com/althea-net/althea-chain.git
cd althea-chain
git checkout v1.5.1
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart althea && sudo journalctl -u althea -f --no-hostname -o cat
```