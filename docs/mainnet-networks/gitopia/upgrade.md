---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-gitopia">
# Upgrade
</div>
###### Chain ID: `gitopia` | Current Node Version: `v3.3.0`


# Clone Gitopia repository
```js
cd $HOME
rm -rf gitopia
git clone https://github.com/gitopia.git
cd gitopia
git checkout v3.3.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.gitopia/cosmovisor/upgrades/v3.3.0/bin
mv build/gitopiad ~/.gitopia/cosmovisor/upgrades/v3.3.0/bin/
rm -rf build
```