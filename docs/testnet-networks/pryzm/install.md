---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-pryzm">
# Installation
</div>
###### Chain ID: `indigo-1` | Current Node Version: `v0.13.0`

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
### Clone Pryzm repo and build pryzmd v0.13.0
```js
cd $HOME
git clone https://github.com/pryzm-finance.git
cd pryzm-finance
git checkout v0.13.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.pryzm/cosmovisor/upgrades/v0.13.0/bin
mv $HOME/go/bin/pryzmd ~/.pryzm/cosmovisor/upgrades/v0.13.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.pryzm/cosmovisor/genesis ~/.pryzm/cosmovisor/current -f
sudo ln -s ~/.pryzm/cosmovisor/current/bin/pryzmd /usr/local/bin/pryzmd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/pryzmd.service > /dev/null << EOF
[Unit]
Description=pryzm node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.pryzm"
Environment="DAEMON_NAME=pryzmd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.pryzm/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Pryzm repo and build pryzmd v0.13.0
```js
cd $HOME
git clone https://github.com/pryzm-finance.git
cd pryzm-finance
git checkout v0.13.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/pryzmd.service > /dev/null << EOF
[Unit]
Description=pryzm node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which pryzmd) start
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
sudo systemctl enable pryzmd
```

## Node configuration
### Set config
```js
pryzmd config chain-id indigo-1
pryzmd config keyring-backend os
pryzmd config node tcp://localhost:26657
```

### Initialize the node
```js
pryzmd init NAME_OF_YOUR_VALIDATOR --chain-id indigo-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/pryzm/genesis.json -o ~/.pryzm/config/genesis.json
curl https://config-t.noders.services/pryzm/addrbook.json -o ~/.pryzm/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"8a863ae1b1b5f840eafd93d4712fe88c4656f188@pryzm-t-rpc.noders.services:25656\"/" ~/.pryzm/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001upryzm\"|" ~/.pryzm/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.pryzm/config/app.toml
```

### Set custom ports

```bash
echo "export pryzmd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${pryzmd_PORT}317%g" \
-e "s%:8080%:${pryzmd_PORT}080%g" \
-e "s%:9090%:${pryzmd_PORT}090%g" \
-e "s%:9091%:${pryzmd_PORT}091%g" \
-e "s%:8545%:${pryzmd_PORT}545%g" \
-e "s%:8546%:${pryzmd_PORT}546%g" \
-e "s%:6065%:${pryzmd_PORT}065%g" ~/.pryzm/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${pryzmd_PORT}657%g" \
-e "s%:6060%:${pryzmd_PORT}060%g" \
-e "s%:26656%:${pryzmd_PORT}656%g" \
-e "s%:26660%:${pryzmd_PORT}660%g" ~/.pryzm/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start pryzmd && sudo journalctl -u pryzmd -f --no-hostname -o cat
```
