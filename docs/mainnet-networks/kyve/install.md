---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-kyve">
# Installation
</div>
###### Chain ID: `kyve-1` | Current Node Version: `v2.1.0`

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
### Clone Kyve repo and build kyved v2.1.0
```js
cd $HOME
git clone https://github.com/KYVENetwork.git
cd KYVENetwork
git checkout v2.1.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.kyve/cosmovisor/upgrades/v2.1.0/bin
mv $HOME/go/bin/kyved ~/.kyve/cosmovisor/upgrades/v2.1.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.kyve/cosmovisor/genesis ~/.kyve/cosmovisor/current -f
sudo ln -s ~/.kyve/cosmovisor/current/bin/kyved /usr/local/bin/kyved -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/kyved.service > /dev/null << EOF
[Unit]
Description=kyve node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.kyve"
Environment="DAEMON_NAME=kyved"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.kyve/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Kyve repo and build kyved v2.1.0
```js
cd $HOME
git clone https://github.com/KYVENetwork.git
cd KYVENetwork
git checkout v2.1.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/kyved.service > /dev/null << EOF
[Unit]
Description=kyve node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which kyved) start
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
sudo systemctl enable kyved
```

## Node configuration
### Set config
```js
kyved config chain-id kyve-1
kyved config keyring-backend os
kyved config node tcp://localhost:26657
```

### Initialize the node
```js
kyved init NAME_OF_YOUR_VALIDATOR --chain-id kyve-1
```

### Download genesis and addrbook
```js
curl https://snapshots.noders.services/kyve/genesis.json -o ~/.kyve/config/genesis.json
curl https://snapshots.noders.services/kyve/addrbook.json -o ~/.kyve/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"a3780bb3c6eb953dfd0019e61a37e054a18dd197@kyve-rpc.noders.services:11056\"/" ~/.kyve/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001ukyve\"|" ~/.kyve/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.kyve/config/app.toml
```

### Set custom ports

```bash
echo "export kyved_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${kyved_PORT}317%g" \
-e "s%:8080%:${kyved_PORT}080%g" \
-e "s%:9090%:${kyved_PORT}090%g" \
-e "s%:9091%:${kyved_PORT}091%g" \
-e "s%:8545%:${kyved_PORT}545%g" \
-e "s%:8546%:${kyved_PORT}546%g" \
-e "s%:6065%:${kyved_PORT}065%g" ~/.kyve/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${kyved_PORT}658%g" \
-e "s%:26657%:${kyved_PORT}657%g" \
-e "s%:6060%:${kyved_PORT}060%g" \
-e "s%:26656%:${kyved_PORT}656%g" \
-e "s%:26660%:${kyved_PORT}660%g" ~/.kyve/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start kyved && sudo journalctl -u kyved -f --no-hostname -o cat
```
