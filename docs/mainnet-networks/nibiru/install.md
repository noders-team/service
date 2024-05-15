---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-nibiru">
# Installation
</div>
###### Chain ID: `cataclysm-1` | Current Node Version: `v1.3.0`

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
### Clone Nibiru repo and build nibid v1.3.0
```js
cd $HOME
git clone https://github.com/NibiruChain.git
cd NibiruChain
git checkout v1.3.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.nibid/cosmovisor/upgrades/v1.3.0/bin
mv $HOME/go/bin/nibid ~/.nibid/cosmovisor/upgrades/v1.3.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.nibid/cosmovisor/genesis ~/.nibid/cosmovisor/current -f
sudo ln -s ~/.nibid/cosmovisor/current/bin/nibid /usr/local/bin/nibid -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/nibid.service > /dev/null << EOF
[Unit]
Description=nibiru node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.nibid"
Environment="DAEMON_NAME=nibid"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.nibid/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Nibiru repo and build nibid v1.3.0
```js
cd $HOME
git clone https://github.com/NibiruChain.git
cd NibiruChain
git checkout v1.3.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/nibid.service > /dev/null << EOF
[Unit]
Description=nibiru node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which nibid) start
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
sudo systemctl enable nibid
```

## Node configuration
### Set config
```js
nibid config chain-id cataclysm-1
nibid config keyring-backend os
nibid config node tcp://localhost:26657
```

### Initialize the node
```js
nibid init NAME_OF_YOUR_VALIDATOR --chain-id cataclysm-1
```

### Download genesis and addrbook
```js
curl https://config.noders.services/nibiru/genesis.json -o ~/.nibid/config/genesis.json
curl https://config.noders.services/nibiru/addrbook.json -o ~/.nibid/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"4159273fc51660a7ab2efb598f7c9297917d3df4@nibiru-rpc.noders.services:35656\"/" ~/.nibid/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001unibi\"|" ~/.nibid/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.nibid/config/app.toml
```

### Set custom ports

```bash
echo "export nibid_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${nibid_PORT}317%g" \
-e "s%:8080%:${nibid_PORT}080%g" \
-e "s%:9090%:${nibid_PORT}090%g" \
-e "s%:9091%:${nibid_PORT}091%g" \
-e "s%:8545%:${nibid_PORT}545%g" \
-e "s%:8546%:${nibid_PORT}546%g" \
-e "s%:6065%:${nibid_PORT}065%g" ~/.nibid/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${nibid_PORT}658%g" \
-e "s%:26657%:${nibid_PORT}657%g" \
-e "s%:6060%:${nibid_PORT}060%g" \
-e "s%:26656%:${nibid_PORT}656%g" \
-e "s%:26660%:${nibid_PORT}660%g" ~/.nibid/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start nibid && sudo journalctl -u nibid -f --no-hostname -o cat
```
