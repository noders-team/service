---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-injective">
# Installation
</div>
###### Chain ID: `injective-1` | Current Node Version: `v1.12.1`

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
### Clone Injective repo and build injectived v1.12.1
```js
cd $HOME
git clone https://github.com/InjectiveLabs.git
cd InjectiveLabs
git checkout v1.12.1
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.injectived/cosmovisor/upgrades/v1.12.1/bin
mv $HOME/go/bin/injectived ~/.injectived/cosmovisor/upgrades/v1.12.1/bin/
```

### Create symlinks
```js
sudo ln -s ~/.injectived/cosmovisor/genesis ~/.injectived/cosmovisor/current -f
sudo ln -s ~/.injectived/cosmovisor/current/bin/injectived /usr/local/bin/injectived -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/injectived.service > /dev/null << EOF
[Unit]
Description=injective node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.injectived"
Environment="DAEMON_NAME=injectived"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.injectived/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Injective repo and build injectived v1.12.1
```js
cd $HOME
git clone https://github.com/InjectiveLabs.git
cd InjectiveLabs
git checkout v1.12.1
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/injectived.service > /dev/null << EOF
[Unit]
Description=injective node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which injectived) start
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
sudo systemctl enable injectived
```

## Node configuration
### Set config
```js
injectived config chain-id injective-1
injectived config keyring-backend os
injectived config node tcp://localhost:26657
```

### Initialize the node
```js
injectived init NAME_OF_YOUR_VALIDATOR --chain-id injective-1
```

### Download genesis and addrbook
```js
curl https://config.noders.services/injective/genesis.json -o ~/.injectived/config/genesis.json
curl https://config.noders.services/injective/addrbook.json -o ~/.injectived/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"b96ce37010e0b3baa5020b536822ccba511c8f5f@injective-rpc.noders.services:33656\"/" ~/.injectived/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001inj\"|" ~/.injectived/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.injectived/config/app.toml
```

### Set custom ports

```bash
echo "export injectived_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${injectived_PORT}317%g" \
-e "s%:8080%:${injectived_PORT}080%g" \
-e "s%:9090%:${injectived_PORT}090%g" \
-e "s%:9091%:${injectived_PORT}091%g" \
-e "s%:8545%:${injectived_PORT}545%g" \
-e "s%:8546%:${injectived_PORT}546%g" \
-e "s%:6065%:${injectived_PORT}065%g" ~/.injectived/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${injectived_PORT}657%g" \
-e "s%:6060%:${injectived_PORT}060%g" \
-e "s%:26656%:${injectived_PORT}656%g" \
-e "s%:26660%:${injectived_PORT}660%g" ~/.injectived/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start injectived && sudo journalctl -u injectived -f --no-hostname -o cat
```
