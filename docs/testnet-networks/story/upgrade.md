---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-story">
# Upgrade
</div>
###### Chain ID: `devnet-1` | Current Node Version: `v1.1.0`

# With Cosmovisor
## Clone Story repository
```js
cd $HOME
rm -rf story
git clone https://github.com/piplabs/story.git
cd story
git checkout v1.1.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.story/cosmovisor/upgrades/v1.1.0/bin
mv build/story ~/.story/cosmovisor/upgrades/v1.1.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Story repository
```js
cd $HOME
rm -rf story
git clone https://github.com/piplabs/story.git
cd story
git checkout v1.1.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart story && sudo journalctl -u story -f --no-hostname -o cat
```