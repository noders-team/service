---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-og">
# Installation
</div>
###### Chain ID: `zgtendermint_9000-1` | Current Node Version: `v1.0.0-testnet`

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
### Clone ZeroGravity repo and build evmosd v1.0.0-testnet
```js
cd $HOME
git clone https://github.com/0glabs/0g-evmos.git
cd 0g-evmos
git checkout v1.0.0-testnet
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.evmosd/cosmovisor/upgrades/v1.0.0-testnet/bin
mv $HOME/go/bin/evmosd ~/.evmosd/cosmovisor/upgrades/v1.0.0-testnet/bin/
```

### Create symlinks
```js
sudo ln -s ~/.evmosd/cosmovisor/genesis ~/.evmosd/cosmovisor/current -f
sudo ln -s ~/.evmosd/cosmovisor/current/bin/evmosd /usr/local/bin/evmosd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/evmosd.service > /dev/null << EOF
[Unit]
Description=og node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.evmosd"
Environment="DAEMON_NAME=evmosd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.evmosd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone ZeroGravity repo and build evmosd v1.0.0-testnet
```js
cd $HOME
git clone https://github.com/0glabs/0g-evmos.git
cd 0g-evmos
git checkout v1.0.0-testnet
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/evmosd.service > /dev/null << EOF
[Unit]
Description=og node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which evmosd) start
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
sudo systemctl enable evmosd
```

## Node configuration
### Set config
```js
evmosd config chain-id zgtendermint_9000-1
evmosd config keyring-backend os
evmosd config node tcp://localhost:26657
```

### Initialize the node
```js
evmosd init NAME_OF_YOUR_VALIDATOR --chain-id zgtendermint_9000-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/og/genesis.json -o ~/.evmosd/config/genesis.json
curl https://config-t.noders.services/og/addrbook.json -o ~/.evmosd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"3e2f5e57e0f8eb4475982a08e39e76629731ce7d@og-t-rpc.noders.services:29656\"/" ~/.evmosd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001evmos\"|" ~/.evmosd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.evmosd/config/app.toml
```

### Set custom ports

```bash
echo "export evmosd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${evmosd_PORT}317%g" \
-e "s%:8080%:${evmosd_PORT}080%g" \
-e "s%:9090%:${evmosd_PORT}090%g" \
-e "s%:9091%:${evmosd_PORT}091%g" \
-e "s%:8545%:${evmosd_PORT}545%g" \
-e "s%:8546%:${evmosd_PORT}546%g" \
-e "s%:6065%:${evmosd_PORT}065%g" ~/.evmosd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${evmosd_PORT}658%g" \
-e "s%:26657%:${evmosd_PORT}657%g" \
-e "s%:6060%:${evmosd_PORT}060%g" \
-e "s%:26656%:${evmosd_PORT}656%g" \
-e "s%:26660%:${evmosd_PORT}660%g" ~/.evmosd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start evmosd && sudo journalctl -u evmosd -f --no-hostname -o cat
```
