---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-aura">
# Upgrade
</div>
###### Chain ID: `aura_6322-2` | Current Node Version: `v0.9.3`


# Clone Aura repository
```js
cd $HOME
rm -rf aura-nw
git clone https://github.com/aura-nw.git
cd aura-nw
git checkout v0.9.3
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.aura/cosmovisor/upgrades/v0.9.3/bin
mv build/aurad ~/.aura/cosmovisor/upgrades/v0.9.3/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Aura repository
```js
cd $HOME
rm -rf aura-nw
git clone https://github.com/aura-nw.git
cd aura-nw
git checkout v0.9.3
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart aurad && sudo journalctl -u aurad -f --no-hostname -o cat
```