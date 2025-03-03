---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-arkeo">
# Installation
</div>
###### Chain ID: `arkeo-testnet-3` | Current Node Version: `v1.0.0-prerelease`

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
### Clone Arkeo repo and build arkeod v1.0.0-prerelease
```js
cd $HOME
git clone https://github.com/arkeonetwork.git
cd arkeonetwork
git checkout v1.0.0-prerelease
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.arkeo/cosmovisor/upgrades/v1.0.0-prerelease/bin
mv $HOME/go/bin/arkeod ~/.arkeo/cosmovisor/upgrades/v1.0.0-prerelease/bin/
```

### Create symlinks
```js
sudo ln -s ~/.arkeo/cosmovisor/genesis ~/.arkeo/cosmovisor/current -f
sudo ln -s ~/.arkeo/cosmovisor/current/bin/arkeod /usr/local/bin/arkeod -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/arkeod.service > /dev/null << EOF
[Unit]
Description=arkeo node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.arkeo"
Environment="DAEMON_NAME=arkeod"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.arkeo/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Arkeo repo and build arkeod v1.0.0-prerelease
```js
cd $HOME
git clone https://github.com/arkeonetwork.git
cd arkeonetwork
git checkout v1.0.0-prerelease
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/arkeod.service > /dev/null << EOF
[Unit]
Description=arkeo node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which arkeod) start
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
sudo systemctl enable arkeod
```

## Node configuration
### Set config
```js
arkeod config chain-id arkeo-testnet-3
arkeod config keyring-backend os
arkeod config node tcp://localhost:26657
```

### Initialize the node
```js
arkeod init NAME_OF_YOUR_VALIDATOR --chain-id arkeo-testnet-3
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/arkeo/genesis.json -o ~/.arkeo/config/genesis.json
curl https://config-t.noders.services/arkeo/addrbook.json -o ~/.arkeo/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"ebfc883c33943f248437312a2d9c5d88c81bd843@arkeo-t-rpc.noders.services:22856\"/" ~/.arkeo/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uarkeo\"|" ~/.arkeo/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.arkeo/config/app.toml
```

### Set custom ports

```bash
echo "export arkeod_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${arkeod_PORT}317%g" \
-e "s%:8080%:${arkeod_PORT}080%g" \
-e "s%:9090%:${arkeod_PORT}090%g" \
-e "s%:9091%:${arkeod_PORT}091%g" \
-e "s%:8545%:${arkeod_PORT}545%g" \
-e "s%:8546%:${arkeod_PORT}546%g" \
-e "s%:6065%:${arkeod_PORT}065%g" ~/.arkeo/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${arkeod_PORT}658%g" \
-e "s%:26657%:${arkeod_PORT}657%g" \
-e "s%:6060%:${arkeod_PORT}060%g" \
-e "s%:26656%:${arkeod_PORT}656%g" \
-e "s%:26660%:${arkeod_PORT}660%g" ~/.arkeo/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start arkeod && sudo journalctl -u arkeod -f --no-hostname -o cat
```