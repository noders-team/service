---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-airchains">
# Installation
</div>
###### Chain ID: `junction` | Current Node Version: `v0.1.0`

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

mkdir -p $HOME/go/bin
```

### Download binaries
```js
cd $HOME
wget -O junctiond https://github.com/airchains-network/junction/releases/download/v0.1.0/junctiond
chmod +x junctiond
mv junctiond $HOME/go/bin/
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/junctiond.service > /dev/null << EOF
[Unit]
Description=airchains node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which junctiond) start
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
sudo systemctl enable junctiond
```

## Node configuration
### Set config
```js
junctiond config chain-id junction
junctiond config keyring-backend os
junctiond config node tcp://localhost:26657
```

### Initialize the node
```js
junctiond init NAME_OF_YOUR_VALIDATOR --chain-id junction
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/airchains/genesis.json -o ~/.junction/config/genesis.json
curl https://config-t.noders.services/airchains/addrbook.json -o ~/.junction/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"7ebc08bbef4bd2b4da8d881474710a2500854c2b@airchain-t-rpc.noders.services:31656\"/" ~/.junction/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uamf\"|" ~/.junction/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.junction/config/app.toml
```

### Set custom ports

```bash
echo "export junctiond_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${junctiond_PORT}317%g" \
-e "s%:8080%:${junctiond_PORT}080%g" \
-e "s%:9090%:${junctiond_PORT}090%g" \
-e "s%:9091%:${junctiond_PORT}091%g" \
-e "s%:8545%:${junctiond_PORT}545%g" \
-e "s%:8546%:${junctiond_PORT}546%g" \
-e "s%:6065%:${junctiond_PORT}065%g" ~/.junction/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${junctiond_PORT}658%g" \
-e "s%:26657%:${junctiond_PORT}657%g" \
-e "s%:6060%:${junctiond_PORT}060%g" \
-e "s%:26656%:${junctiond_PORT}656%g" \
-e "s%:26660%:${junctiond_PORT}660%g" ~/.junction/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start junctiond && sudo journalctl -u junctiond -f --no-hostname -o cat
```
