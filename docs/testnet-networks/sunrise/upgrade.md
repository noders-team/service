---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-sunrise">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `v0.2.6`

# With Cosmovisor
## Clone Sunrise repository
```js
cd $HOME
rm -rf sunrise
git clone https://github.com/sunriselayer/sunrise.git
cd sunrise
git checkout v0.2.6
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.sunrise/cosmovisor/upgrades/v0.2.6/bin
mv build/sunrised ~/.sunrise/cosmovisor/upgrades/v0.2.6/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Sunrise repository
```js
cd $HOME
rm -rf sunrise
git clone https://github.com/sunriselayer/sunrise.git
cd sunrise
git checkout v0.2.6
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart sunrised && sudo journalctl -u sunrised -f --no-hostname -o cat
```