---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-initia">
# Installation
</div>
###### Chain ID: `initiation-1` | Current Node Version: `v0.2.14`

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
### Clone Initia repo and build initiad v0.2.14
```js
cd $HOME
git clone https://github.com/initia-labs/initia.git
cd initia
git checkout v0.2.14
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.initiad/cosmovisor/upgrades/v0.2.14/bin
mv $HOME/go/bin/initiad ~/.initiad/cosmovisor/upgrades/v0.2.14/bin/
```

### Create symlinks
```js
sudo ln -s ~/.initiad/cosmovisor/genesis ~/.initiad/cosmovisor/current -f
sudo ln -s ~/.initiad/cosmovisor/current/bin/initiad /usr/local/bin/initiad -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/initiad.service > /dev/null << EOF
[Unit]
Description=initia node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.initiad"
Environment="DAEMON_NAME=initiad"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.initiad/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Initia repo and build initiad v0.2.14
```js
cd $HOME
git clone https://github.com/initia-labs/initia.git
cd initia
git checkout v0.2.14
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/initiad.service > /dev/null << EOF
[Unit]
Description=initia node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which initiad) start
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
sudo systemctl enable initiad
```

## Node configuration
### Set config
```js
initiad config chain-id initiation-1
initiad config keyring-backend os
initiad config node tcp://localhost:26657
```

### Initialize the node
```js
initiad init NAME_OF_YOUR_VALIDATOR --chain-id initiation-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/initia/genesis.json -o ~/.initiad/config/genesis.json
curl https://config-t.noders.services/initia/addrbook.json -o ~/.initiad/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"1c670728944f8f549a63bb2985296f8354cf735c@initia-t-rpc.noders.services:32656\"/" ~/.initiad/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uinit\"|" ~/.initiad/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.initiad/config/app.toml
```

### Set custom ports

```bash
echo "export initiad_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${initiad_PORT}317%g" \
-e "s%:8080%:${initiad_PORT}080%g" \
-e "s%:9090%:${initiad_PORT}090%g" \
-e "s%:9091%:${initiad_PORT}091%g" \
-e "s%:8545%:${initiad_PORT}545%g" \
-e "s%:8546%:${initiad_PORT}546%g" \
-e "s%:6065%:${initiad_PORT}065%g" ~/.initiad/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${initiad_PORT}658%g" \
-e "s%:26657%:${initiad_PORT}657%g" \
-e "s%:6060%:${initiad_PORT}060%g" \
-e "s%:26656%:${initiad_PORT}656%g" \
-e "s%:26660%:${initiad_PORT}660%g" ~/.initiad/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start initiad && sudo journalctl -u initiad -f --no-hostname -o cat
```
