---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-crossfi">
# Installation
</div>
###### Chain ID: `crossfi-evm-testnet-1` | Current Node Version: `0.3.0-prebuild9`

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
### Clone CrossFI repo and build crossfid 0.3.0-prebuild9
```js
cd $HOME
git clone https://github.com/crossfichain.git
cd crossfichain
git checkout 0.3.0-prebuild9
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.mineplex-chain/cosmovisor/upgrades/0.3.0-prebuild9/bin
mv $HOME/go/bin/crossfid ~/.mineplex-chain/cosmovisor/upgrades/0.3.0-prebuild9/bin/
```

### Create symlinks
```js
sudo ln -s ~/.mineplex-chain/cosmovisor/genesis ~/.mineplex-chain/cosmovisor/current -f
sudo ln -s ~/.mineplex-chain/cosmovisor/current/bin/crossfid /usr/local/bin/crossfid -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/crossfid.service > /dev/null << EOF
[Unit]
Description=crossfi node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.mineplex-chain"
Environment="DAEMON_NAME=crossfid"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.mineplex-chain/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone CrossFI repo and build crossfid 0.3.0-prebuild9
```js
cd $HOME
git clone https://github.com/crossfichain.git
cd crossfichain
git checkout 0.3.0-prebuild9
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/crossfid.service > /dev/null << EOF
[Unit]
Description=crossfi node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which crossfid) start
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
sudo systemctl enable crossfid
```

## Node configuration
### Set config
```js
crossfid config chain-id crossfi-evm-testnet-1
crossfid config keyring-backend os
crossfid config node tcp://localhost:26657
```

### Initialize the node
```js
crossfid init NAME_OF_YOUR_VALIDATOR --chain-id crossfi-evm-testnet-1
```

### Download genesis and addrbook
```js
curl https://snapshots-t.noders.services/crossfi/genesis.json -o ~/.mineplex-chain/config/genesis.json
curl https://snapshots-t.noders.services/crossfi/addrbook.json -o ~/.mineplex-chain/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"de9daabf7d001c44749bca2eab3085d40ef3accb@crossfi-t-rpc.noders.services:26056\"/" ~/.mineplex-chain/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001mpx\"|" ~/.mineplex-chain/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.mineplex-chain/config/app.toml
```

### Set custom ports

```bash
echo "export crossfid_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${crossfid_PORT}317%g" \
-e "s%:8080%:${crossfid_PORT}080%g" \
-e "s%:9090%:${crossfid_PORT}090%g" \
-e "s%:9091%:${crossfid_PORT}091%g" \
-e "s%:8545%:${crossfid_PORT}545%g" \
-e "s%:8546%:${crossfid_PORT}546%g" \
-e "s%:6065%:${crossfid_PORT}065%g" ~/.mineplex-chain/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${crossfid_PORT}658%g" \
-e "s%:26657%:${crossfid_PORT}657%g" \
-e "s%:6060%:${crossfid_PORT}060%g" \
-e "s%:26656%:${crossfid_PORT}656%g" \
-e "s%:26660%:${crossfid_PORT}660%g" ~/.mineplex-chain/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start crossfid && sudo journalctl -u crossfid -f --no-hostname -o cat
```