---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-injective">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v1.12.1`


# Clone Injective repository
```js
cd $HOME
rm -rf InjectiveLabs
git clone https://github.com/InjectiveLabs.git
cd InjectiveLabs
git checkout v1.12.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.injectived/cosmovisor/upgrades/v1.12.1/bin
mv build/injectived ~/.injectived/cosmovisor/upgrades/v1.12.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Injective repository
```js
cd $HOME
rm -rf InjectiveLabs
git clone https://github.com/InjectiveLabs.git
cd InjectiveLabs
git checkout v1.12.1
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart injectived && sudo journalctl -u injectived -f --no-hostname -o cat
```