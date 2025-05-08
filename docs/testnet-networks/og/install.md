---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-og">
# Installation
</div>
###### Chain ID: `zgtendermint_16600-2` | Current Node Version: `v0.5.0.1`

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
### Clone ZeroGravity repo and build 0gchaind v0.5.0.1
```js
cd $HOME
git clone https://github.com/0glabs/0g-chain.git
cd 0g-chain
git checkout v0.5.0.1
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.0gchain/cosmovisor/upgrades/v0.5.0.1/bin
mv $HOME/go/bin/0gchaind ~/.0gchain/cosmovisor/upgrades/v0.5.0.1/bin/
```

### Create symlinks
```js
sudo ln -s ~/.0gchain/cosmovisor/genesis ~/.0gchain/cosmovisor/current -f
sudo ln -s ~/.0gchain/cosmovisor/current/bin/0gchaind /usr/local/bin/0gchaind -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/0gchaind.service > /dev/null << EOF
[Unit]
Description=og node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.0gchain"
Environment="DAEMON_NAME=0gchaind"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.0gchain/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone ZeroGravity repo and build 0gchaind v0.5.0.1
```js
cd $HOME
git clone https://github.com/0glabs/0g-chain.git
cd 0g-chain
git checkout v0.5.0.1
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/0gchaind.service > /dev/null << EOF
[Unit]
Description=og node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which 0gchaind) start
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
sudo systemctl enable 0gchaind
```

## Node configuration
### Set config
```js
0gchaind config chain-id zgtendermint_16600-2
0gchaind config keyring-backend os
0gchaind config node tcp://localhost:26657
```

### Initialize the node
```js
0gchaind init NAME_OF_YOUR_VALIDATOR --chain-id zgtendermint_16600-2
```

### Download genesis and addrbook
```js
curl https://snapshots-t.noders.services/og/genesis.json -o ~/.0gchain/config/genesis.json
curl https://snapshots-t.noders.services/og/addrbook.json -o ~/.0gchain/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"d9fee544b90d15c4f024e52b6c5b2fd9fd199514@og-t-rpc.noders.services:23856\"/" ~/.0gchain/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001ua0gi\"|" ~/.0gchain/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.0gchain/config/app.toml
```

### Set custom ports

```bash
echo "export 0gchaind_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${0gchaind_PORT}317%g" \
-e "s%:8080%:${0gchaind_PORT}080%g" \
-e "s%:9090%:${0gchaind_PORT}090%g" \
-e "s%:9091%:${0gchaind_PORT}091%g" \
-e "s%:8545%:${0gchaind_PORT}545%g" \
-e "s%:8546%:${0gchaind_PORT}546%g" \
-e "s%:6065%:${0gchaind_PORT}065%g" ~/.0gchain/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${0gchaind_PORT}658%g" \
-e "s%:26657%:${0gchaind_PORT}657%g" \
-e "s%:6060%:${0gchaind_PORT}060%g" \
-e "s%:26656%:${0gchaind_PORT}656%g" \
-e "s%:26660%:${0gchaind_PORT}660%g" ~/.0gchain/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start 0gchaind && sudo journalctl -u 0gchaind -f --no-hostname -o cat
```