---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-quicksilver">
# Upgrade
</div>
###### Chain ID: `rhye-2` | Current Node Version: `v1.6.1-health`

# With Cosmovisor
## Clone Quicksilver repository
```js
cd $HOME
rm -rf quicksilver-zone
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout v1.6.1-health
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.quicksilverd/cosmovisor/upgrades/v1.6.1-health/bin
mv build/quicksilverd ~/.quicksilverd/cosmovisor/upgrades/v1.6.1-health/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Quicksilver repository
```js
cd $HOME
rm -rf quicksilver-zone
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout v1.6.1-health
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart quicksilverd && sudo journalctl -u quicksilverd -f --no-hostname -o cat
```