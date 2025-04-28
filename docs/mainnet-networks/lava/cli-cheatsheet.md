---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-lava">
# CLI Cheatsheet
</div>
###### Chain ID: `lava-mainnet-1` | Current Node Version: `v5.3.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
lavad keys add KEY
```

### Recover key (via existing mnemonic)
```js
lavad keys add KEY --recover
```

### List all keys
```js
lavad keys list
```

### Delete key
```js
lavad keys delete KEY
```

## Wallet
### Wallet balance
```js
lavad q bank balances $(lavad keys show KEY -a) --node https://lava-rpc.noders.services:443
```

### Send
```js
lavad tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000ulava \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

### Withdraw rewards from all validators
```js
lavad tx distribution withdraw-all-rewards \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

### Withdraw Rewards including Commission
```js
lavad tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

### Delegate tokens to yourself
```js
lavad tx staking delegate $(lavad keys show KEY --bech val -a) 1000000ulava \
--chain-id lava-mainnet-1 \
--node https://lava-rpc.noders.services:443 --fees 20000ulava \
--from KEY
```

### Delegate tokens to validator
```js
lavad tx staking delegate VALIDATOR_ADDRESS 1000000ulava \
--chain-id lava-mainnet-1 \
--node https://lava-rpc.noders.services:443 --fees 20000ulava \
--from KEY
```

### Redelegate tokens to another validator
```js
lavad tx staking redelegate $(lavad keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000ulava \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

### Unbond tokens from your validator
```js
lavad tx staking unbond $(lavad keys show KEY --bech val -a) ulava \
  --chain-id andromeda-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

## Governance
### List of all proposals
```js
lavad query gov proposals --node https://lava-rpc.noders.services:443
```
### Check vote
```js
lavad query gov proposal PROPOSAL_NUMBER \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
lavad tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
lavad tx staking create-validator \
  --amount 1000000ulava \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(lavad tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

### Edit validator
```js
lavad tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id lava-mainnet-1 \
--commission-rate 0.05 \
--from KEY \
--node https://lava-rpc.noders.services:443 --fees 20000ulava \
```

### Unjail
```js
lavad tx slashing unjail \
  --chain-id lava-mainnet-1 \
  --node https://lava-rpc.noders.services:443 --fees 20000ulava \
  --from KEY
```

### Jail reason
```js
lavad query slashing signing-info $(lavad tendermint show-validator)
```

### Validator details
```js
lavad q staking validator $(lavad keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
lavad status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
lavad status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(lavad tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.lava/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(lavad q staking validator $(lavad keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(lavad status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://lava-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001ulava\"/" ~/.lava/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.lava/config/config.toml
```

### Reset chain data
```js
lavad tendermint unsafe-reset-all --keep-addr-book --home ~/.lava
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable lavad
```

### Disable service
```js
sudo systemctl disable lavad
```

### Start service
```js
sudo systemctl start lavad
```

### Stop service
```js
sudo systemctl stop lavad
```

### Restart service
```js
sudo systemctl restart lavad
```

### Check service status
```js
sudo systemctl status lavad
```

### Check service logs
```js
sudo journalctl -u lavad -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop lavad
sudo systemctl disable lavad
sudo rm /etc/systemd/system/lava.service
sudo systemctl daemon-reload
rm -f $(which lavad)
rm -rf ~/.lava
rm -rf $HOME/lavanet
```
