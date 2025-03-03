---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-pell">
# Installation
</div>
###### Chain ID: `ignite_186-1` | Current Node Version: `v1.2.1`

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
### Clone Pell repo and build pellcored v1.2.1
```js
cd $HOME
git clone https://github.com/0xPellNetwork.git
cd 0xPellNetwork
git checkout v1.2.1
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.pellcored/cosmovisor/upgrades/v1.2.1/bin
mv $HOME/go/bin/pellcored ~/.pellcored/cosmovisor/upgrades/v1.2.1/bin/
```

### Create symlinks
```js
sudo ln -s ~/.pellcored/cosmovisor/genesis ~/.pellcored/cosmovisor/current -f
sudo ln -s ~/.pellcored/cosmovisor/current/bin/pellcored /usr/local/bin/pellcored -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/pellcored.service > /dev/null << EOF
[Unit]
Description=pell node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.pellcored"
Environment="DAEMON_NAME=pellcored"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.pellcored/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Pell repo and build pellcored v1.2.1
```js
cd $HOME
git clone https://github.com/0xPellNetwork.git
cd 0xPellNetwork
git checkout v1.2.1
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/pellcored.service > /dev/null << EOF
[Unit]
Description=pell node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which pellcored) start
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
sudo systemctl enable pellcored
```

## Node configuration
### Set config
```js
pellcored config chain-id ignite_186-1
pellcored config keyring-backend os
pellcored config node tcp://localhost:26657
```

### Initialize the node
```js
pellcored init NAME_OF_YOUR_VALIDATOR --chain-id ignite_186-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/pell/genesis.json -o ~/.pellcored/config/genesis.json
curl https://config-t.noders.services/pell/addrbook.json -o ~/.pellcored/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"78d89ac4ef91fd92bd97769891711ca58bd7f512@pell-t-rpc.noders.services:47956\"/" ~/.pellcored/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001apell\"|" ~/.pellcored/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.pellcored/config/app.toml
```

### Set custom ports

```bash
echo "export pellcored_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${pellcored_PORT}317%g" \
-e "s%:8080%:${pellcored_PORT}080%g" \
-e "s%:9090%:${pellcored_PORT}090%g" \
-e "s%:9091%:${pellcored_PORT}091%g" \
-e "s%:8545%:${pellcored_PORT}545%g" \
-e "s%:8546%:${pellcored_PORT}546%g" \
-e "s%:6065%:${pellcored_PORT}065%g" ~/.pellcored/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${pellcored_PORT}658%g" \
-e "s%:26657%:${pellcored_PORT}657%g" \
-e "s%:6060%:${pellcored_PORT}060%g" \
-e "s%:26656%:${pellcored_PORT}656%g" \
-e "s%:26660%:${pellcored_PORT}660%g" ~/.pellcored/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start pellcored && sudo journalctl -u pellcored -f --no-hostname -o cat
```