---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-gitopia">
# Upgrade
</div>
###### Chain ID: `gitopia` | Current Node Version: `v5.1.0`


# Clone Gitopia repository
```js
cd $HOME
rm -rf gitopia
git clone https://github.com/gitopia.git
cd gitopia
git checkout v5.1.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.gitopia/cosmovisor/upgrades/v5.1.0/bin
mv build/gitopiad ~/.gitopia/cosmovisor/upgrades/v5.1.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Gitopia repository
```js
cd $HOME
rm -rf gitopia
git clone https://github.com/gitopia.git
cd gitopia
git checkout v5.1.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart gitopiad && sudo journalctl -u gitopiad -f --no-hostname -o cat
```