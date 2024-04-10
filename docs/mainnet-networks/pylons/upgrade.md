---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-pylons">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: ``


# Clone Pylons repository
```js
cd $HOME
rm -rf 
git clone .git
cd 
git checkout 
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.pylonsd/cosmovisor/upgrades//bin
mv build/pylonsd ~/.pylonsd/cosmovisor/upgrades//bin/
rm -rf build
```