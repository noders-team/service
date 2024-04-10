---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-pryzm">
# Upgrade
</div>
###### Chain ID: `indigo-1` | Current Node Version: `v0.11.1`


# Clone Pryzm repository
```js
cd $HOME
rm -rf pryzm-finance
git clone https://github.com/pryzm-finance.git
cd pryzm-finance
git checkout v0.11.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.pryzm/cosmovisor/upgrades/v0.11.1/bin
mv build/pryzmd ~/.pryzm/cosmovisor/upgrades/v0.11.1/bin/
rm -rf build
```