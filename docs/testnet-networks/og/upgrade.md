---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-og">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

# With Cosmovisor
## Clone ZeroGravity repository
```js
cd $HOME
rm -rf 0g-chain
git clone https://github.com/0glabs/0g-chain.git
cd 0g-chain
git checkout auto
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.0gchain/cosmovisor/upgrades/auto/bin
mv build/0gchaind ~/.0gchain/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone ZeroGravity repository
```js
cd $HOME
rm -rf 0g-chain
git clone https://github.com/0glabs/0g-chain.git
cd 0g-chain
git checkout auto
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart 0gchaind && sudo journalctl -u 0gchaind -f --no-hostname -o cat
```