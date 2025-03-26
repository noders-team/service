---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-althea">
# Installation
</div>
###### Chain ID: `althea_258432-1` | Current Node Version: `auto`

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
### Clone Althea repo and build althea auto
```js
cd $HOME
git clone https://github.com/althea-net/althea-chain.git
cd althea-chain
git checkout auto
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.althea/cosmovisor/upgrades/auto/bin
mv $HOME/go/bin/althea ~/.althea/cosmovisor/upgrades/auto/bin/
```

### Create symlinks
```js
sudo ln -s ~/.althea/cosmovisor/genesis ~/.althea/cosmovisor/current -f
sudo ln -s ~/.althea/cosmovisor/current/bin/althea /usr/local/bin/althea -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/althea.service > /dev/null << EOF
[Unit]
Description=althea node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.althea"
Environment="DAEMON_NAME=althea"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.althea/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Althea repo and build althea auto
```js
cd $HOME
git clone https://github.com/althea-net/althea-chain.git
cd althea-chain
git checkout auto
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/althea.service > /dev/null << EOF
[Unit]
Description=althea node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which althea) start
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
sudo systemctl enable althea
```

## Node configuration
### Set config
```js
althea config chain-id althea_258432-1
althea config keyring-backend os
althea config node tcp://localhost:26657
```

### Initialize the node
```js
althea init NAME_OF_YOUR_VALIDATOR --chain-id althea_258432-1
```

### Download genesis and addrbook
```js
curl https://config.noders.services/althea/genesis.json -o ~/.althea/config/genesis.json
curl https://config.noders.services/althea/addrbook.json -o ~/.althea/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"cd95708f6f107d9970e86668a70bf8f6253dda60@althea-rpc.noders.services:12456\"/" ~/.althea/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001aalthea\"|" ~/.althea/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.althea/config/app.toml
```

### Set custom ports

```bash
echo "export althea_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${althea_PORT}317%g" \
-e "s%:8080%:${althea_PORT}080%g" \
-e "s%:9090%:${althea_PORT}090%g" \
-e "s%:9091%:${althea_PORT}091%g" \
-e "s%:8545%:${althea_PORT}545%g" \
-e "s%:8546%:${althea_PORT}546%g" \
-e "s%:6065%:${althea_PORT}065%g" ~/.althea/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${althea_PORT}658%g" \
-e "s%:26657%:${althea_PORT}657%g" \
-e "s%:6060%:${althea_PORT}060%g" \
-e "s%:26656%:${althea_PORT}656%g" \
-e "s%:26660%:${althea_PORT}660%g" ~/.althea/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start althea && sudo journalctl -u althea -f --no-hostname -o cat
```
