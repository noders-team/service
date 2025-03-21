---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-rebus">
# Upgrade
</div>
###### Chain ID: `reb_1111-1` | Current Node Version: `v0.5.0`


# Clone Rebus repository
```js
cd $HOME
rm -rf rebuschain
git clone https://github.com/rebuschain.git
cd rebuschain
git checkout v0.5.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.rebusd/cosmovisor/upgrades/v0.5.0/bin
mv build/rebusd ~/.rebusd/cosmovisor/upgrades/v0.5.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Rebus repository
```js
cd $HOME
rm -rf rebuschain
git clone https://github.com/rebuschain.git
cd rebuschain
git checkout v0.5.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart rebusd && sudo journalctl -u rebusd -f --no-hostname -o cat
```