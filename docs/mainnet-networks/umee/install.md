---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-umee">
# Installation
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

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
### Clone UX repo and build umeed auto
```js
cd $HOME
git clone https://github.com/umee-network.git
cd umee-network
git checkout auto
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.umee/cosmovisor/upgrades/auto/bin
mv $HOME/go/bin/umeed ~/.umee/cosmovisor/upgrades/auto/bin/
```

### Create symlinks
```js
sudo ln -s ~/.umee/cosmovisor/genesis ~/.umee/cosmovisor/current -f
sudo ln -s ~/.umee/cosmovisor/current/bin/umeed /usr/local/bin/umeed -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/umeed.service > /dev/null << EOF
[Unit]
Description=umee node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.umee"
Environment="DAEMON_NAME=umeed"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.umee/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone UX repo and build umeed auto
```js
cd $HOME
git clone https://github.com/umee-network.git
cd umee-network
git checkout auto
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/umeed.service > /dev/null << EOF
[Unit]
Description=umee node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which umeed) start
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
sudo systemctl enable umeed
```

## Node configuration
### Set config
```js
umeed config chain-id auto
umeed config keyring-backend os
umeed config node tcp://localhost:26657
```

### Initialize the node
```js
umeed init NAME_OF_YOUR_VALIDATOR --chain-id auto
```

### Download genesis and addrbook
```js
curl https://config.noders.services/umee/genesis.json -o ~/.umee/config/genesis.json
curl https://config.noders.services/umee/addrbook.json -o ~/.umee/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"@umee-rpc.noders.services:\"/" ~/.umee/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uumee\"|" ~/.umee/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.umee/config/app.toml
```

### Set custom ports

```bash
echo "export umeed_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${umeed_PORT}317%g" \
-e "s%:8080%:${umeed_PORT}080%g" \
-e "s%:9090%:${umeed_PORT}090%g" \
-e "s%:9091%:${umeed_PORT}091%g" \
-e "s%:8545%:${umeed_PORT}545%g" \
-e "s%:8546%:${umeed_PORT}546%g" \
-e "s%:6065%:${umeed_PORT}065%g" ~/.umee/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${umeed_PORT}658%g" \
-e "s%:26657%:${umeed_PORT}657%g" \
-e "s%:6060%:${umeed_PORT}060%g" \
-e "s%:26656%:${umeed_PORT}656%g" \
-e "s%:26660%:${umeed_PORT}660%g" ~/.umee/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start umeed && sudo journalctl -u umeed -f --no-hostname -o cat
```
