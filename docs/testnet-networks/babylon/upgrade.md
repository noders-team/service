---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-babylon">
# Upgrade
</div>
###### Chain ID: `bbn-test-5` | Current Node Version: `v1.0.0-rc.5`

# With Cosmovisor
## Clone Babylon repository
```js
cd $HOME
rm -rf babylonglobal
git clone https://discord.com/invite/babylonglobal.git
cd babylonglobal
git checkout v1.0.0-rc.5
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.babylond/cosmovisor/upgrades/v1.0.0-rc.5/bin
mv build/babylond ~/.babylond/cosmovisor/upgrades/v1.0.0-rc.5/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Babylon repository
```js
cd $HOME
rm -rf babylonglobal
git clone https://discord.com/invite/babylonglobal.git
cd babylonglobal
git checkout v1.0.0-rc.5
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart babylond && sudo journalctl -u babylond -f --no-hostname -o cat
```