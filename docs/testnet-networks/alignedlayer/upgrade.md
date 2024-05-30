---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-alignedlayer">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `vauto`

# With Cosmovisor
## Clone Alignedlayer repository
```js
cd $HOME
rm -rf aligned_layer_tendermint
git clone https://github.com/yetanotherco/aligned_layer_tendermint.git
cd aligned_layer_tendermint
git checkout vauto
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.alignedlayer/cosmovisor/upgrades/vauto/bin
mv build/alignedlayerd ~/.alignedlayer/cosmovisor/upgrades/vauto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Alignedlayer repository
```js
cd $HOME
rm -rf aligned_layer_tendermint
git clone https://github.com/yetanotherco/aligned_layer_tendermint.git
cd aligned_layer_tendermint
git checkout vauto
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart alignedlayerd && sudo journalctl -u alignedlayerd -f --no-hostname -o cat
```