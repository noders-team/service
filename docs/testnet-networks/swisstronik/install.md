---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-swisstronik">
# Installation
</div>
###### Chain ID: `swisstronik_1291-1` | Current Node Version: `v1.0.1`

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
### Clone Swisstronik repo and build swisstronikd v1.0.1
```js
cd $HOME
git clone https://github.com/SigmaGmbH.git
cd SigmaGmbH
git checkout v1.0.1
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.swisstronik/cosmovisor/upgrades/v1.0.1/bin
mv $HOME/go/bin/swisstronikd ~/.swisstronik/cosmovisor/upgrades/v1.0.1/bin/
```

### Create symlinks
```js
sudo ln -s ~/.swisstronik/cosmovisor/genesis ~/.swisstronik/cosmovisor/current -f
sudo ln -s ~/.swisstronik/cosmovisor/current/bin/swisstronikd /usr/local/bin/swisstronikd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/swisstronikd.service > /dev/null << EOF
[Unit]
Description=swisstronik node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.swisstronik"
Environment="DAEMON_NAME=swisstronikd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.swisstronik/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Swisstronik repo and build swisstronikd v1.0.1
```js
cd $HOME
git clone https://github.com/SigmaGmbH.git
cd SigmaGmbH
git checkout v1.0.1
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/swisstronikd.service > /dev/null << EOF
[Unit]
Description=swisstronik node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which swisstronikd) start
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
sudo systemctl enable swisstronikd
```

## Node configuration
### Set config
```js
swisstronikd config chain-id swisstronik_1291-1
swisstronikd config keyring-backend os
swisstronikd config node tcp://localhost:26657
```

### Initialize the node
```js
swisstronikd init NAME_OF_YOUR_VALIDATOR --chain-id swisstronik_1291-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/swisstronik/genesis.json -o ~/.swisstronik/config/genesis.json
curl https://config-t.noders.services/swisstronik/addrbook.json -o ~/.swisstronik/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"1db22294bec0fd095eaa4a3f2381aef5105b538c@swisstronik-t-rpc.noders.services:26656\"/" ~/.swisstronik/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uswtr\"|" ~/.swisstronik/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.swisstronik/config/app.toml
```

### Set custom ports

```bash
echo "export swisstronikd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${swisstronikd_PORT}317%g" \
-e "s%:8080%:${swisstronikd_PORT}080%g" \
-e "s%:9090%:${swisstronikd_PORT}090%g" \
-e "s%:9091%:${swisstronikd_PORT}091%g" \
-e "s%:8545%:${swisstronikd_PORT}545%g" \
-e "s%:8546%:${swisstronikd_PORT}546%g" \
-e "s%:6065%:${swisstronikd_PORT}065%g" ~/.swisstronik/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${swisstronikd_PORT}658%g" \
-e "s%:26657%:${swisstronikd_PORT}657%g" \
-e "s%:6060%:${swisstronikd_PORT}060%g" \
-e "s%:26656%:${swisstronikd_PORT}656%g" \
-e "s%:26660%:${swisstronikd_PORT}660%g" ~/.swisstronik/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start swisstronikd && sudo journalctl -u swisstronikd -f --no-hostname -o cat
```
