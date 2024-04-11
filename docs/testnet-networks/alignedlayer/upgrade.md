---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-alignedlayer">
# Upgrade
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `v0.1.0`

# With Cosmovisor
## Clone Alignedlayer repository
```js
cd $HOME
rm -rf aligned_layer
git clone https://github.com/yetanotherco/aligned_layer.git
cd aligned_layer
git checkout v0.1.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.alignedlayer/cosmovisor/upgrades/v0.1.0/bin
mv build/alignedlayerd ~/.alignedlayer/cosmovisor/upgrades/v0.1.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Alignedlayer repository
```js
cd $HOME
rm -rf aligned_layer
git clone https://github.com/yetanotherco/aligned_layer.git
cd aligned_layer
git checkout v0.1.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart alignedlayerd && sudo journalctl -u alignedlayerd -f --no-hostname -o cat
```