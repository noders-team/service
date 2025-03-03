---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-humans">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`


# Clone Humans repository
```js
cd $HOME
rm -rf humansdotai
git clone https://github.com/humansdotai.git
cd humansdotai
git checkout auto
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.humansd/cosmovisor/upgrades/auto/bin
mv build/humansd ~/.humansd/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Humans repository
```js
cd $HOME
rm -rf humansdotai
git clone https://github.com/humansdotai.git
cd humansdotai
git checkout auto
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart humansd && sudo journalctl -u humansd -f --no-hostname -o cat
```