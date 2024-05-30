---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-dymension">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `vauto`


# Clone Dymension repository
```js
cd $HOME
rm -rf dymensionxyz
git clone https://github.com/dymensionxyz.git
cd dymensionxyz
git checkout vauto
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.dymension/cosmovisor/upgrades/vauto/bin
mv build/dymd ~/.dymension/cosmovisor/upgrades/vauto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Dymension repository
```js
cd $HOME
rm -rf dymensionxyz
git clone https://github.com/dymensionxyz.git
cd dymensionxyz
git checkout vauto
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart dymd && sudo journalctl -u dymd -f --no-hostname -o cat
```