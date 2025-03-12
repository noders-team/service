---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-haqq">
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
### Clone Haqq repo and build haqqd auto
```js
cd $HOME
git clone https://github.com/haqq-network.git
cd haqq-network
git checkout auto
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.haqqd/cosmovisor/upgrades/auto/bin
mv $HOME/go/bin/haqqd ~/.haqqd/cosmovisor/upgrades/auto/bin/
```

### Create symlinks
```js
sudo ln -s ~/.haqqd/cosmovisor/genesis ~/.haqqd/cosmovisor/current -f
sudo ln -s ~/.haqqd/cosmovisor/current/bin/haqqd /usr/local/bin/haqqd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/haqqd.service > /dev/null << EOF
[Unit]
Description=haqq node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.haqqd"
Environment="DAEMON_NAME=haqqd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.haqqd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Haqq repo and build haqqd auto
```js
cd $HOME
git clone https://github.com/haqq-network.git
cd haqq-network
git checkout auto
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/haqqd.service > /dev/null << EOF
[Unit]
Description=haqq node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which haqqd) start
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
sudo systemctl enable haqqd
```

## Node configuration
### Set config
```js
haqqd config chain-id auto
haqqd config keyring-backend os
haqqd config node tcp://localhost:26657
```

### Initialize the node
```js
haqqd init NAME_OF_YOUR_VALIDATOR --chain-id auto
```

### Download genesis and addrbook
```js
curl https://config.noders.services/haqq/genesis.json -o ~/.haqqd/config/genesis.json
curl https://config.noders.services/haqq/addrbook.json -o ~/.haqqd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"@haqq-rpc.noders.services:\"/" ~/.haqqd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001aISLM\"|" ~/.haqqd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.haqqd/config/app.toml
```

### Set custom ports

```bash
echo "export haqqd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${haqqd_PORT}317%g" \
-e "s%:8080%:${haqqd_PORT}080%g" \
-e "s%:9090%:${haqqd_PORT}090%g" \
-e "s%:9091%:${haqqd_PORT}091%g" \
-e "s%:8545%:${haqqd_PORT}545%g" \
-e "s%:8546%:${haqqd_PORT}546%g" \
-e "s%:6065%:${haqqd_PORT}065%g" ~/.haqqd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${haqqd_PORT}658%g" \
-e "s%:26657%:${haqqd_PORT}657%g" \
-e "s%:6060%:${haqqd_PORT}060%g" \
-e "s%:26656%:${haqqd_PORT}656%g" \
-e "s%:26660%:${haqqd_PORT}660%g" ~/.haqqd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start haqqd && sudo journalctl -u haqqd -f --no-hostname -o cat
```
