---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-sunrise">
# Installation
</div>
###### Chain ID: `sunrise-test-0.2` | Current Node Version: `v0.2.6`

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
### Clone Sunrise repo and build sunrised v0.2.6
```js
cd $HOME
git clone https://github.com/sunriselayer/sunrise.git
cd sunrise
git checkout v0.2.6
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.sunrise/cosmovisor/upgrades/v0.2.6/bin
mv $HOME/go/bin/sunrised ~/.sunrise/cosmovisor/upgrades/v0.2.6/bin/
```

### Create symlinks
```js
sudo ln -s ~/.sunrise/cosmovisor/genesis ~/.sunrise/cosmovisor/current -f
sudo ln -s ~/.sunrise/cosmovisor/current/bin/sunrised /usr/local/bin/sunrised -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/sunrised.service > /dev/null << EOF
[Unit]
Description=sunrise node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.sunrise"
Environment="DAEMON_NAME=sunrised"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.sunrise/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Sunrise repo and build sunrised v0.2.6
```js
cd $HOME
git clone https://github.com/sunriselayer/sunrise.git
cd sunrise
git checkout v0.2.6
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/sunrised.service > /dev/null << EOF
[Unit]
Description=sunrise node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which sunrised) start
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
sudo systemctl enable sunrised
```

## Node configuration
### Set config
```js
sunrised config chain-id sunrise-test-0.2
sunrised config keyring-backend os
sunrised config node tcp://localhost:26657
```

### Initialize the node
```js
sunrised init NAME_OF_YOUR_VALIDATOR --chain-id sunrise-test-0.2
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/sunrise/genesis.json -o ~/.sunrise/config/genesis.json
curl https://config-t.noders.services/sunrise/addrbook.json -o ~/.sunrise/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"66751839fcecdde5eaabd33b0e8877e8d7e85747@sunrise-t-rpc.noders.services:28356\"/" ~/.sunrise/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uvrise\"|" ~/.sunrise/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.sunrise/config/app.toml
```

### Set custom ports

```bash
echo "export sunrised_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${sunrised_PORT}317%g" \
-e "s%:8080%:${sunrised_PORT}080%g" \
-e "s%:9090%:${sunrised_PORT}090%g" \
-e "s%:9091%:${sunrised_PORT}091%g" \
-e "s%:8545%:${sunrised_PORT}545%g" \
-e "s%:8546%:${sunrised_PORT}546%g" \
-e "s%:6065%:${sunrised_PORT}065%g" ~/.sunrise/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${sunrised_PORT}658%g" \
-e "s%:26657%:${sunrised_PORT}657%g" \
-e "s%:6060%:${sunrised_PORT}060%g" \
-e "s%:26656%:${sunrised_PORT}656%g" \
-e "s%:26660%:${sunrised_PORT}660%g" ~/.sunrise/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start sunrised && sudo journalctl -u sunrised -f --no-hostname -o cat
```