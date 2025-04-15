---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-desmos">
# Installation
</div>
###### Chain ID: `desmos-mainnet` | Current Node Version: `v7.1.0`

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
### Clone Desmos repo and build desmos v7.1.0
```js
cd $HOME
git clone https://github.com/desmos-labs.git
cd desmos-labs
git checkout v7.1.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.desmos/cosmovisor/upgrades/v7.1.0/bin
mv $HOME/go/bin/desmos ~/.desmos/cosmovisor/upgrades/v7.1.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.desmos/cosmovisor/genesis ~/.desmos/cosmovisor/current -f
sudo ln -s ~/.desmos/cosmovisor/current/bin/desmos /usr/local/bin/desmos -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/desmos.service > /dev/null << EOF
[Unit]
Description=desmos node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.desmos"
Environment="DAEMON_NAME=desmos"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.desmos/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Desmos repo and build desmos v7.1.0
```js
cd $HOME
git clone https://github.com/desmos-labs.git
cd desmos-labs
git checkout v7.1.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/desmos.service > /dev/null << EOF
[Unit]
Description=desmos node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which desmos) start
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
sudo systemctl enable desmos
```

## Node configuration
### Set config
```js
desmos config chain-id desmos-mainnet
desmos config keyring-backend os
desmos config node tcp://localhost:26657
```

### Initialize the node
```js
desmos init NAME_OF_YOUR_VALIDATOR --chain-id desmos-mainnet
```

### Download genesis and addrbook
```js
curl https://snapshots.noders.services/desmos/genesis.json -o ~/.desmos/config/genesis.json
curl https://snapshots.noders.services/desmos/addrbook.json -o ~/.desmos/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"d39816957bb0c94cc21bbf1ed2965f0d53661496@desmos-rpc.noders.services:16256\"/" ~/.desmos/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uosmo\"|" ~/.desmos/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.desmos/config/app.toml
```

### Set custom ports

```bash
echo "export desmos_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${desmos_PORT}317%g" \
-e "s%:8080%:${desmos_PORT}080%g" \
-e "s%:9090%:${desmos_PORT}090%g" \
-e "s%:9091%:${desmos_PORT}091%g" \
-e "s%:8545%:${desmos_PORT}545%g" \
-e "s%:8546%:${desmos_PORT}546%g" \
-e "s%:6065%:${desmos_PORT}065%g" ~/.desmos/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${desmos_PORT}658%g" \
-e "s%:26657%:${desmos_PORT}657%g" \
-e "s%:6060%:${desmos_PORT}060%g" \
-e "s%:26656%:${desmos_PORT}656%g" \
-e "s%:26660%:${desmos_PORT}660%g" ~/.desmos/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start desmos && sudo journalctl -u desmos -f --no-hostname -o cat
```
