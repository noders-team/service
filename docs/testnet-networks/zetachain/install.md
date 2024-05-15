---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-zetachain">
# Installation
</div>
###### Chain ID: `athens_7001-1` | Current Node Version: `v15`

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
### Clone Zetachain repo and build zetacored v15
```js
cd $HOME
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout v15
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.zetacored/cosmovisor/upgrades/v15/bin
mv $HOME/go/bin/zetacored ~/.zetacored/cosmovisor/upgrades/v15/bin/
```

### Create symlinks
```js
sudo ln -s ~/.zetacored/cosmovisor/genesis ~/.zetacored/cosmovisor/current -f
sudo ln -s ~/.zetacored/cosmovisor/current/bin/zetacored /usr/local/bin/zetacored -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/zetacored.service > /dev/null << EOF
[Unit]
Description=zetachain node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.zetacored"
Environment="DAEMON_NAME=zetacored"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.zetacored/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Zetachain repo and build zetacored v15
```js
cd $HOME
git clone https://github.com/zeta-chain.git
cd zeta-chain
git checkout v15
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/zetacored.service > /dev/null << EOF
[Unit]
Description=zetachain node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which zetacored) start
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
sudo systemctl enable zetacored
```

## Node configuration
### Set config
```js
zetacored config chain-id athens_7001-1
zetacored config keyring-backend os
zetacored config node tcp://localhost:26657
```

### Initialize the node
```js
zetacored init NAME_OF_YOUR_VALIDATOR --chain-id athens_7001-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/zetachain/genesis.json -o ~/.zetacored/config/genesis.json
curl https://config-t.noders.services/zetachain/addrbook.json -o ~/.zetacored/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"f1a9255d4dd4de7c0e070266c072cdbe0f023918@zetachain-t-rpc.noders.services:17656\"/" ~/.zetacored/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001azeta\"|" ~/.zetacored/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.zetacored/config/app.toml
```

### Set custom ports

```bash
echo "export zetacored_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${zetacored_PORT}317%g" \
-e "s%:8080%:${zetacored_PORT}080%g" \
-e "s%:9090%:${zetacored_PORT}090%g" \
-e "s%:9091%:${zetacored_PORT}091%g" \
-e "s%:8545%:${zetacored_PORT}545%g" \
-e "s%:8546%:${zetacored_PORT}546%g" \
-e "s%:6065%:${zetacored_PORT}065%g" ~/.zetacored/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${zetacored_PORT}658%g" \
-e "s%:26657%:${zetacored_PORT}657%g" \
-e "s%:6060%:${zetacored_PORT}060%g" \
-e "s%:26656%:${zetacored_PORT}656%g" \
-e "s%:26660%:${zetacored_PORT}660%g" ~/.zetacored/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start zetacored && sudo journalctl -u zetacored -f --no-hostname -o cat
```
