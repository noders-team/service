---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# Upgrade
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[VERSION]`


# Clone [CHAIN_NAME] repository
```js
cd $HOME
rm -rf [GITHUB_FOLDER_NAME]
git clone [SOCIAL_GITHUB].git
cd [GITHUB_FOLDER_NAME]
git checkout [VERSION]
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p [DAEMON_HOME]/cosmovisor/upgrades/[VERSION]/bin
mv build/[DAEMON_NAME] [DAEMON_HOME]/cosmovisor/upgrades/[VERSION]/bin/
rm -rf build
```

# Without Cosmovisor
## Clone [CHAIN_NAME] repository
```js
cd $HOME
rm -rf [GITHUB_FOLDER_NAME]
git clone [SOCIAL_GITHUB].git
cd [GITHUB_FOLDER_NAME]
git checkout [VERSION]
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart [DAEMON_NAME] && sudo journalctl -u [DAEMON_NAME] -f --no-hostname -o cat
```