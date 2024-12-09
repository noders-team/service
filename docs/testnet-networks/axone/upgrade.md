---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-axone">
# Upgrade
</div>
###### Chain ID: `axone-dentrite-1` | Current Node Version: `v10.0.0`

# With Cosmovisor
## Clone Axone repository
```js
cd $HOME
rm -rf axone-protocol
git clone https://github.com/axone-protocol.git
cd axone-protocol
git checkout v10.0.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.axoned/cosmovisor/upgrades/v10.0.0/bin
mv build/axoned ~/.axoned/cosmovisor/upgrades/v10.0.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Axone repository
```js
cd $HOME
rm -rf axone-protocol
git clone https://github.com/axone-protocol.git
cd axone-protocol
git checkout v10.0.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart axoned && sudo journalctl -u axoned -f --no-hostname -o cat
```