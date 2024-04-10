---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# Installation
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[VERSION]`

## Install dependencies

```js
sudo apt -q update
sudo apt -qy install curl git jq lz4 build-essential
sudo apt -qy upgrade
```

## Install GO
```js
ver="1.21.3" &&
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" &&
sudo rm -rf /usr/local/go &&
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" &&
rm "go$ver.linux-amd64.tar.gz" &&
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile &&
source $HOME/.bash_profile &&
go version
```

## Install with Cosmovisor
:::note ADVANCED ROUTE

Cosmosvisor is a process manager for Cosmos SDK application binaries that monitors the governance module for incoming chain upgrade proposals. If a proposal is approved, cosmosvisor can automatically download the new binary, stop the current one, switch to the new binary, and restart the node with the new binary.

:::
### Download and build binaries
### Clone [CHAIN_NAME] repo and build [DAEMON_NAME] [VERSION]
```js
cd $HOME
git clone [SOCIAL_GITHUB].git
cd [GITHUB_FOLDER_NAME]
git checkout [VERSION]
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p [DAEMON_HOME]/cosmovisor/upgrades/[VERSION]/bin
mv $HOME/go/bin/[DAEMON_NAME] [DAEMON_HOME]/cosmovisor/upgrades/[VERSION]/bin/
```

### Create symlinks
```js
sudo ln -s [DAEMON_HOME]/cosmovisor/genesis [DAEMON_HOME]/cosmovisor/current -f
sudo ln -s [DAEMON_HOME]/cosmovisor/current/bin/[DAEMON_NAME] /usr/local/bin/[DAEMON_NAME] -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/[DAEMON_SERVICE] > /dev/null << EOF
[Unit]
Description=[CHAIN_SYSTEM_NAME] node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=[DAEMON_HOME]"
Environment="DAEMON_NAME=[DAEMON_NAME]"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:[DAEMON_HOME]/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone [CHAIN_NAME] repo and build [DAEMON_NAME] [VERSION]
```js
cd $HOME
git clone [SOCIAL_GITHUB].git
cd [GITHUB_FOLDER_NAME]
git checkout [VERSION]
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/[DAEMON_SERVICE] > /dev/null << EOF
[Unit]
Description=[CHAIN_SYSTEM_NAME] node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which [DAEMON_NAME]) start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable [DAEMON_SERVICE].service
```

## Node configuration
### Set config
```js
[DAEMON_NAME] config chain-id [CHAIN_ID]
[DAEMON_NAME] config keyring-backend os
[DAEMON_NAME] config node tcp://localhost:26657
```

### Initialize the node
```js
[DAEMON_NAME] init NAME_OF_YOUR_VALIDATOR --chain-id [CHAIN_ID]
```

### Download genesis and addrbook
```js
curl -Ls https://config-t.noders.services/[CHAIN_SYSTEM_NAME]/genesis.json > [DAEMON_HOME]/config/genesis.json
curl -Ls https://config-t.noders.services/[CHAIN_SYSTEM_NAME]/addrbook.json > [DAEMON_HOME]/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"[ENDPOINT_PEER]\"/" [DAEMON_HOME]/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001[CHAIN_DENOM]\"|" [DAEMON_HOME]/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  [DAEMON_HOME]/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" [DAEMON_HOME]/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" [DAEMON_HOME]/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start [DAEMON_SERVICE].service && sudo journalctl -u [DAEMON_SERVICE].service -f --no-hostname -o cat
```
