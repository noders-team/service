---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-artela">
# Upgrade
</div>
###### Chain ID: `artela_11822-1` | Current Node Version: `v0.4.7-rc6`

# With Cosmovisor
## Clone Artela repository
```js
cd $HOME
rm -rf artela-network
git clone https://github.com/artela-network.git
cd artela-network
git checkout v0.4.7-rc6
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.artelad/cosmovisor/upgrades/v0.4.7-rc6/bin
mv build/artelad ~/.artelad/cosmovisor/upgrades/v0.4.7-rc6/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Artela repository
```js
cd $HOME
rm -rf artela-network
git clone https://github.com/artela-network.git
cd artela-network
git checkout v0.4.7-rc6
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart artelad && sudo journalctl -u artelad -f --no-hostname -o cat
```