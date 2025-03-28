---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-warden">
# Upgrade
</div>
###### Chain ID: `chiado_10010-1` | Current Node Version: `v0.6.2`

# With Cosmovisor
## Clone Warden repository
```js
cd $HOME
rm -rf wardenprotocol
git clone https://github.com/warden-protocol/wardenprotocol.git
cd wardenprotocol
git checkout v0.6.2
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.warden/cosmovisor/upgrades/v0.6.2/bin
mv build/wardend ~/.warden/cosmovisor/upgrades/v0.6.2/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Warden repository
```js
cd $HOME
rm -rf wardenprotocol
git clone https://github.com/warden-protocol/wardenprotocol.git
cd wardenprotocol
git checkout v0.6.2
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart wardend && sudo journalctl -u wardend -f --no-hostname -o cat
```