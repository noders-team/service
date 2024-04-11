---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-entrypoint">
# Installation
</div>
###### Chain ID: `entrypoint-pubtest-2` | Current Node Version: `v1.3.0`

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
### Clone Entrypoint repo and build entrypointd v1.3.0
```js
cd $HOME
git clone https://github.com/entrypoint-zone.git
cd entrypoint-zone
git checkout v1.3.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.entrypoint/cosmovisor/upgrades/v1.3.0/bin
mv $HOME/go/bin/entrypointd ~/.entrypoint/cosmovisor/upgrades/v1.3.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.entrypoint/cosmovisor/genesis ~/.entrypoint/cosmovisor/current -f
sudo ln -s ~/.entrypoint/cosmovisor/current/bin/entrypointd /usr/local/bin/entrypointd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/entrypointd.service > /dev/null << EOF
[Unit]
Description=entrypoint node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.entrypoint"
Environment="DAEMON_NAME=entrypointd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.entrypoint/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Entrypoint repo and build entrypointd v1.3.0
```js
cd $HOME
git clone https://github.com/entrypoint-zone.git
cd entrypoint-zone
git checkout v1.3.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/entrypointd.service > /dev/null << EOF
[Unit]
Description=entrypoint node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which entrypointd) start
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
sudo systemctl enable entrypointd
```

## Node configuration
### Set config
```js
entrypointd config chain-id entrypoint-pubtest-2
entrypointd config keyring-backend os
entrypointd config node tcp://localhost:26657
```

### Initialize the node
```js
entrypointd init NAME_OF_YOUR_VALIDATOR --chain-id entrypoint-pubtest-2
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/entrypoint/genesis.json -o ~/.entrypoint/config/genesis.json
curl https://config-t.noders.services/entrypoint/addrbook.json -o ~/.entrypoint/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"955890d4ded935a973e0637983e80d6bdcafbe83@entrypoint-t-rpc.noders.services:15656\"/" ~/.entrypoint/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uentry\"|" ~/.entrypoint/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.entrypoint/config/app.toml
```

### Set custom ports

```bash
echo "export entrypointd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${entrypointd_PORT}317%g" \
-e "s%:8080%:${entrypointd_PORT}080%g" \
-e "s%:9090%:${entrypointd_PORT}090%g" \
-e "s%:9091%:${entrypointd_PORT}091%g" \
-e "s%:8545%:${entrypointd_PORT}545%g" \
-e "s%:8546%:${entrypointd_PORT}546%g" \
-e "s%:6065%:${entrypointd_PORT}065%g" ~/.entrypoint/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${entrypointd_PORT}657%g" \
-e "s%:6060%:${entrypointd_PORT}060%g" \
-e "s%:26656%:${entrypointd_PORT}656%g" \
-e "s%:26660%:${entrypointd_PORT}660%g" ~/.entrypoint/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start entrypointd && sudo journalctl -u entrypointd -f --no-hostname -o cat
```
