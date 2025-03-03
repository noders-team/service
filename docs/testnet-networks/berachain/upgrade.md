---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-berachain">
# Upgrade
</div>
###### Chain ID: `bartio-beacon-80084` | Current Node Version: `auto`

# With Cosmovisor
## Clone Berachain repository
```js
cd $HOME
rm -rf berachain
git clone https://github.com/berachain.git
cd berachain
git checkout auto
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.beacond/cosmovisor/upgrades/auto/bin
mv build/beacond ~/.beacond/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Berachain repository
```js
cd $HOME
rm -rf berachain
git clone https://github.com/berachain.git
cd berachain
git checkout auto
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart beacond && sudo journalctl -u beacond -f --no-hostname -o cat
```