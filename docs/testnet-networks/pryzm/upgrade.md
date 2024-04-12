---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-pryzm">
# Upgrade
</div>
###### Chain ID: `indigo-1` | Current Node Version: `v0.13.0`

# With Cosmovisor
## Clone Pryzm repository
```js
cd $HOME
rm -rf pryzm-finance
git clone https://github.com/pryzm-finance.git
cd pryzm-finance
git checkout v0.13.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.pryzm/cosmovisor/upgrades/v0.13.0/bin
mv build/pryzmd ~/.pryzm/cosmovisor/upgrades/v0.13.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Pryzm repository
```js
cd $HOME
rm -rf pryzm-finance
git clone https://github.com/pryzm-finance.git
cd pryzm-finance
git checkout v0.13.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart pryzmd && sudo journalctl -u pryzmd -f --no-hostname -o cat
```