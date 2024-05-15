---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-seda">
# Installation
</div>
###### Chain ID: `seda-1` | Current Node Version: `v0.1.1`

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
### Clone Seda repo and build sedad v0.1.1
```js
cd $HOME
git clone https://github.com/sedaprotocol.git
cd sedaprotocol
git checkout v0.1.1
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.sedad/cosmovisor/upgrades/v0.1.1/bin
mv $HOME/go/bin/sedad ~/.sedad/cosmovisor/upgrades/v0.1.1/bin/
```

### Create symlinks
```js
sudo ln -s ~/.sedad/cosmovisor/genesis ~/.sedad/cosmovisor/current -f
sudo ln -s ~/.sedad/cosmovisor/current/bin/sedad /usr/local/bin/sedad -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/sedad.service > /dev/null << EOF
[Unit]
Description=seda node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.sedad"
Environment="DAEMON_NAME=sedad"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.sedad/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Seda repo and build sedad v0.1.1
```js
cd $HOME
git clone https://github.com/sedaprotocol.git
cd sedaprotocol
git checkout v0.1.1
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/sedad.service > /dev/null << EOF
[Unit]
Description=seda node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which sedad) start
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
sudo systemctl enable sedad
```

## Node configuration
### Set config
```js
sedad config chain-id seda-1
sedad config keyring-backend os
sedad config node tcp://localhost:26657
```

### Initialize the node
```js
sedad init NAME_OF_YOUR_VALIDATOR --chain-id seda-1
```

### Download genesis and addrbook
```js
curl https://config.noders.services/seda/genesis.json -o ~/.sedad/config/genesis.json
curl https://config.noders.services/seda/addrbook.json -o ~/.sedad/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"c9100af84ba8c9dbeb0c1c49837620bf447bf55c@seda-rpc.noders.services:36656\"/" ~/.sedad/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001aseda\"|" ~/.sedad/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.sedad/config/app.toml
```

### Set custom ports

```bash
echo "export sedad_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${sedad_PORT}317%g" \
-e "s%:8080%:${sedad_PORT}080%g" \
-e "s%:9090%:${sedad_PORT}090%g" \
-e "s%:9091%:${sedad_PORT}091%g" \
-e "s%:8545%:${sedad_PORT}545%g" \
-e "s%:8546%:${sedad_PORT}546%g" \
-e "s%:6065%:${sedad_PORT}065%g" ~/.sedad/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${sedad_PORT}658%g" \
-e "s%:26657%:${sedad_PORT}657%g" \
-e "s%:6060%:${sedad_PORT}060%g" \
-e "s%:26656%:${sedad_PORT}656%g" \
-e "s%:26660%:${sedad_PORT}660%g" ~/.sedad/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start sedad && sudo journalctl -u sedad -f --no-hostname -o cat
```
