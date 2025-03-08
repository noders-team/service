---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-zenrock">
# Upgrade
</div>
###### Chain ID: `diamond-1` | Current Node Version: `v5.16.10`


# Clone Zenrock repository
```js
cd $HOME
rm -rf zrchain
git clone https://github.com/Zenrock-Foundation/zrchain.git
cd zrchain
git checkout v5.16.10
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.zrchain/cosmovisor/upgrades/v5.16.10/bin
mv build/zenrockd ~/.zrchain/cosmovisor/upgrades/v5.16.10/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Zenrock repository
```js
cd $HOME
rm -rf zrchain
git clone https://github.com/Zenrock-Foundation/zrchain.git
cd zrchain
git checkout v5.16.10
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart zenrockd && sudo journalctl -u zenrockd -f --no-hostname -o cat
```