---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-quicksilver">
# Installation
</div>
###### Chain ID: `quicksilver-2` | Current Node Version: `v1.8.1`

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
### Clone Quicksilver repo and build quicksilverd v1.8.1
```js
cd $HOME
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout v1.8.1
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.quicksilverd/cosmovisor/upgrades/v1.8.1/bin
mv $HOME/go/bin/quicksilverd ~/.quicksilverd/cosmovisor/upgrades/v1.8.1/bin/
```

### Create symlinks
```js
sudo ln -s ~/.quicksilverd/cosmovisor/genesis ~/.quicksilverd/cosmovisor/current -f
sudo ln -s ~/.quicksilverd/cosmovisor/current/bin/quicksilverd /usr/local/bin/quicksilverd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/quicksilverd.service > /dev/null << EOF
[Unit]
Description=quicksilver node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.quicksilverd"
Environment="DAEMON_NAME=quicksilverd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.quicksilverd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Quicksilver repo and build quicksilverd v1.8.1
```js
cd $HOME
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout v1.8.1
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/quicksilverd.service > /dev/null << EOF
[Unit]
Description=quicksilver node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which quicksilverd) start
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
sudo systemctl enable quicksilverd
```

## Node configuration
### Set config
```js
quicksilverd config chain-id quicksilver-2
quicksilverd config keyring-backend os
quicksilverd config node tcp://localhost:26657
```

### Initialize the node
```js
quicksilverd init NAME_OF_YOUR_VALIDATOR --chain-id quicksilver-2
```

### Download genesis and addrbook
```js
curl https://snapshots.noders.services/quicksilver/genesis.json -o ~/.quicksilverd/config/genesis.json
curl https://snapshots.noders.services/quicksilver/addrbook.json -o ~/.quicksilverd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"f3ac1f863748202672ff9e34f2e6da92260f537e@quicksilver-rpc.noders.services:11156\"/" ~/.quicksilverd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uqck\"|" ~/.quicksilverd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.quicksilverd/config/app.toml
```

### Set custom ports

```bash
echo "export quicksilverd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${quicksilverd_PORT}317%g" \
-e "s%:8080%:${quicksilverd_PORT}080%g" \
-e "s%:9090%:${quicksilverd_PORT}090%g" \
-e "s%:9091%:${quicksilverd_PORT}091%g" \
-e "s%:8545%:${quicksilverd_PORT}545%g" \
-e "s%:8546%:${quicksilverd_PORT}546%g" \
-e "s%:6065%:${quicksilverd_PORT}065%g" ~/.quicksilverd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${quicksilverd_PORT}658%g" \
-e "s%:26657%:${quicksilverd_PORT}657%g" \
-e "s%:6060%:${quicksilverd_PORT}060%g" \
-e "s%:26656%:${quicksilverd_PORT}656%g" \
-e "s%:26660%:${quicksilverd_PORT}660%g" ~/.quicksilverd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start quicksilverd && sudo journalctl -u quicksilverd -f --no-hostname -o cat
```
