---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-namada">
# Installation
</div>
###### Chain ID: `housefire-cotton.d3c912fee7462` | Current Node Version: `v0.44.1`

## Install dependencies
```js
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y make git-core libssl-dev pkg-config libclang-12-dev build-essential protobuf-compiler
```

## Install GO
```js
ver="1.20.3" &&
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" &&
sudo rm -rf /usr/local/go &&
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" &&
rm "go$ver.linux-amd64.tar.gz" &&
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile &&
source $HOME/.bash_profile &&
go version
```

## Install Rust
```js
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
```

## Download namada* binaries
```js
wget https://github.com/anoma/namada/releases/download/v0.44.1/namada-v0.44.1-Linux-x86_64.tar.gz
tar -xvf namada-v0.44.1-Linux-x86_64.tar.gz
rm namada-v0.44.1-Linux-x86_64.tar.gz
cd namada-v0.44.1-Linux-x86_64
sudo mv namad* /usr/local/bin/
```

## Install CometBFT
```js
git clone https://github.com/cometbft/cometbft.git
cd cometbft
git checkout v0.37.9
make build
sudo cp $HOME/cometbft/build/cometbft /usr/local/bin/
```

## Join-network as Full Nodes or Post-Genesis Validator
```js
namadac utils join-network --chain-id housefire-cotton.d3c912fee7462
sed -i 's#persistent_peers = ".*"#persistent_peers = "tcp://ba3e08d76ce95549927a2a3f4cf379f4969a945c@165.227.42.204:26656"#' $HOME/.local/share/namada/housefire-cotton.d3c912fee7462/config.toml
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/namadad.service > /dev/null << EOF
[Unit]
Description=namada node service
After=network-online.target

[Service]
User=$USER
Environment=TM_LOG_LEVEL=p2p:none,pex:error
Environment=NAMADA_CMT_STDOUT=true
ExecStart=$(which namada) node ledger run
StandardOutput=syslog
StandardError=syslog
Restart=always
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

### Set custom ports
```bash
echo "export namadad_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

## Set custom ports in config.toml
```js
sed -i.bak -e "s%:26657%:${namadad_PORT}657%g" \
-e "s%:26656%:${namadad_PORT}656%g" \
-e "s%:26545%:${namadad_PORT}545%g" \
-e "s%:8545%:${namadad_PORT}545%g" \
-e "s%:26660%:${namadad_PORT}660%g" $HOME/.local/share/namada/housefire-cotton.d3c912fee7462/config.toml
```

## Add persistent peers
```js
sed -i 's#persistent_peers = ".*"#persistent_peers = "tcp://d6691dc866be3de0be931d2018e8fdc6a564de20@165.227.42.204:26656"#' $HOME/.local/share/namada/housefire-cotton.d3c912fee7462/config.toml
```

### Start node and check logs
```js
sudo systemctl start namadad && sudo journalctl -u namadad -f --no-hostname -o cat
```