---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-initia">
# Upgrade
</div>
###### Chain ID: `initiation-1` | Current Node Version: `v0.2.14`

# With Cosmovisor
## Clone Initia repository
```js
cd $HOME
rm -rf initia
git clone https://github.com/initia-labs/initia.git
cd initia
git checkout v0.2.14
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.initiad/cosmovisor/upgrades/v0.2.14/bin
mv build/initiad ~/.initiad/cosmovisor/upgrades/v0.2.14/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Initia repository
```js
cd $HOME
rm -rf initia
git clone https://github.com/initia-labs/initia.git
cd initia
git checkout v0.2.14
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart initiad && sudo journalctl -u initiad -f --no-hostname -o cat
```