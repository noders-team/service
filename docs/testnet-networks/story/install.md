---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-story">
# Installation
</div>
###### Chain ID: `odyssey-0` | Current Node Version: `v0.13.0`

## Install dependencies

```js
sudo apt -q update
sudo apt -qy install curl git jq lz4 build-essential
sudo apt -qy upgrade
```

## Install GO
```js
ver="1.22.3" &&
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

### Download geth
```js
cd $HOME
wget -O geth https://github.com/piplabs/story-geth/releases/download/v0.11.0/geth-linux-amd64
chmod +x $HOME/geth
mv $HOME/geth ~/go/bin/
[ ! -d "$HOME/.story/story" ] && mkdir -p "$HOME/.story/story"
[ ! -d "$HOME/.story/geth" ] && mkdir -p "$HOME/.story/geth"
```

### Clone Story repo and build story auto
```js
cd $HOME
git clone https://github.com/piplabs/story
cd story
git checkout v0.13.0
```

### Build binaries
```js
go build -o story ./client 
mv $HOME/story/story $HOME/go/bin/
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.story/cosmovisor/upgrades/auto/bin
mv $HOME/go/bin/story ~/.story/cosmovisor/upgrades/auto/bin/
```

### Create symlinks
```js
sudo ln -s ~/.story/cosmovisor/genesis ~/.story/cosmovisor/current -f
sudo ln -s ~/.story/cosmovisor/current/bin/story /usr/local/bin/story -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/story.service > /dev/null << EOF
[Unit]
Description=story node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.story"
Environment="DAEMON_NAME=story"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.story/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Story repo and build story auto
```js
cd $HOME
git clone https://github.com/piplabs/story
    cd story
git checkout v0.13.0
```

### Build binaries
```js
go build -o story ./client 
mv $HOME/story/story $HOME/go/bin/
```

## Run node
### Create service for story
```js
sudo tee /etc/systemd/system/story.service > /dev/null << EOF
[Unit]
Description=story node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which story) start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Create service for geth
```js
sudo tee /etc/systemd/system/story-geth.service > /dev/null <<EOF
[Unit]
Description=Story Geth daemon
After=network-online.target

[Service]
User=$USER
ExecStart=$HOME/go/bin/geth --odyssey --syncmode full --http --http.api eth,net,web3,engine --http.vhosts '*' --http.addr 0.0.0.0 --http.port 8545 --authrpc.port 6551 --ws --ws.api eth,web3,net,txpool --ws.addr 0.0.0.0 --ws.port 8546
Restart=on-failure
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable story
sudo systemctl enable story-geth
```

## Node configuration
### Set config
```js
story config chain-id odyssey-0
story config keyring-backend os
story config node tcp://localhost:26657
```

### Initialize the node
```js
story init --moniker NAME_OF_YOUR_VALIDATOR test --network odyssey-0
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/story/genesis.json -o ~/.story/config/genesis.json
curl https://config-t.noders.services/story/addrbook.json -o ~/.story/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"@story.rpc.noders.services:\"/" ~/.story/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001aip\"|" ~/.story/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.story/config/app.toml
```

### Set custom ports

```bash
echo "export story_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${story_PORT}317%g" \
-e "s%:8080%:${story_PORT}080%g" \
-e "s%:9090%:${story_PORT}090%g" \
-e "s%:9091%:${story_PORT}091%g" \
-e "s%:8545%:${story_PORT}545%g" \
-e "s%:8546%:${story_PORT}546%g" \
-e "s%:6065%:${story_PORT}065%g" ~/.story/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${story_PORT}658%g" \
-e "s%:26657%:${story_PORT}657%g" \
-e "s%:6060%:${story_PORT}060%g" \
-e "s%:26656%:${story_PORT}656%g" \
-e "s%:26660%:${story_PORT}660%g" ~/.story/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start story && sudo journalctl -u story -f --no-hostname -o cat
sudo systemctl start story-geth && sudo journalctl -u story-geth -f --no-hostname -o cat
```