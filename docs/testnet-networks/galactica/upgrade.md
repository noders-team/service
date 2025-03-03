---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-galactica">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

# With Cosmovisor
## Clone Galactica repository
```js
cd $HOME
rm -rf networks
git clone https://github.com/Galactica-corp/networks.git
cd networks
git checkout auto
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.galactica/cosmovisor/upgrades/auto/bin
mv build/galacticad ~/.galactica/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Galactica repository
```js
cd $HOME
rm -rf networks
git clone https://github.com/Galactica-corp/networks.git
cd networks
git checkout auto
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart galacticad && sudo journalctl -u galacticad -f --no-hostname -o cat
```