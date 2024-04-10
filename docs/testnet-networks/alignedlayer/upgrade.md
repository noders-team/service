---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-alignedlayer">
# Upgrade
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `0.1.0`


# Clone Alignedlayer repository
```js
cd $HOME
rm -rf aligned_layer
git clone https://github.com/yetanotherco/aligned_layer.git
cd aligned_layer
git checkout 0.1.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.alignedlayer/cosmovisor/upgrades/0.1.0/bin
mv build/alignedlayerd ~/.alignedlayer/cosmovisor/upgrades/0.1.0/bin/
rm -rf build
```