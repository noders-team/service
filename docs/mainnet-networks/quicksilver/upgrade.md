---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-quicksilver">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`


# Clone Quicksilver repository
```js
cd $HOME
rm -rf quicksilver-zone
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout auto
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.quicksilverd/cosmovisor/upgrades/auto/bin
mv build/quicksilverd ~/.quicksilverd/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Quicksilver repository
```js
cd $HOME
rm -rf quicksilver-zone
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout auto
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart quicksilverd && sudo journalctl -u quicksilverd -f --no-hostname -o cat
```