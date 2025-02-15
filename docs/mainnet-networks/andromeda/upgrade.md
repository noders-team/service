---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-andromeda">
# Upgrade
</div>
###### Chain ID: `andromeda-1` | Current Node Version: `v2.0.0`


# Clone Andromeda repository
```js
cd $HOME
rm -rf andromedaprotocol
git clone https://github.com/andromedaprotocol.git
cd andromedaprotocol
git checkout v2.0.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.andromeda/cosmovisor/upgrades/v2.0.0/bin
mv build/andromedad ~/.andromeda/cosmovisor/upgrades/v2.0.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Andromeda repository
```js
cd $HOME
rm -rf andromedaprotocol
git clone https://github.com/andromedaprotocol.git
cd andromedaprotocol
git checkout v2.0.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart andromedad && sudo journalctl -u andromedad -f --no-hostname -o cat
```