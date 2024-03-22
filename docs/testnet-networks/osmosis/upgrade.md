---
hide_table_of_contents: false
title: Upgrade *
sidebar_position: 2
---

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# Upgrade
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[DAEMON_VERSION]`

```bash
# Clone project repository
cd $HOME
rm -rf [GITHUB_FOLDER_NAME]
git clone [SOCIAL_GITHUB].git
cd [GITHUB_FOLDER_NAME]
git checkout [DAEMON_VERSION]

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p [DAEMON_HOME]/cosmovisor/upgrades/[DAEMON_VERSION]/bin
mv build/[DAEMON_NAME] [DAEMON_HOME]/cosmovisor/upgrades/[DAEMON_VERSION]/bin/
rm -rf build
```