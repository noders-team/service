---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-jackal">
# Upgrade
</div>
###### Chain ID: `jackal-1` | Current Node Version: `v3.2.1`


# Clone Jackal repository
```js
cd $HOME
rm -rf canine-chain
git clone https://github.com/JackalLabs/canine-chain.git
cd canine-chain
git checkout v3.2.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.canine/cosmovisor/upgrades/v3.2.1/bin
mv build/canined ~/.canine/cosmovisor/upgrades/v3.2.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Jackal repository
```js
cd $HOME
rm -rf canine-chain
git clone https://github.com/JackalLabs/canine-chain.git
cd canine-chain
git checkout v3.2.1
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart canined && sudo journalctl -u canined -f --no-hostname -o cat
```