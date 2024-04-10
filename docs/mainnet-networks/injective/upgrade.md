---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-injective">
# Upgrade
</div>
###### Chain ID: `injective-1` | Current Node Version: `vnull`


# Clone Injective repository
```js
cd $HOME
rm -rf InjectiveLabs
git clone https://github.com/InjectiveLabs.git
cd InjectiveLabs
git checkout vnull
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.injectived/cosmovisor/upgrades/vnull/bin
mv build/injectived ~/.injectived/cosmovisor/upgrades/vnull/bin/
rm -rf build
```