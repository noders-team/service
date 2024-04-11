---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-lambda">
# CLI Cheatsheet
</div>
###### Chain ID: `lambda_92000-1` | Current Node Version: `v1.0.1`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
lambdavm keys add KEY
```

### Recover key (via existing mnemonic)
```js
lambdavm keys add KEY --recover
```

### List all keys
```js
lambdavm keys list
```

### Delete key
```js
lambdavm keys delete KEY
```

## Wallet
### Wallet balance
```js
lambdavm q bank balances $(lambdavm keys show KEY -a) --node https://lambda-rpc.noders.services:443
```

### Send
```js
lambdavm tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000ulamb \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

### Withdraw rewards from all validators
```js
lambdavm tx distribution withdraw-all-rewards \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

### Withdraw Rewards including Commission
```js
lambdavm tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

### Delegate tokens to yourself
```js
lambdavm tx staking delegate $(lambdavm keys show KEY --bech val -a) 1000000ulamb \
--chain-id lambda_92000-1 \
--node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
--from KEY
```

### Delegate tokens to validator
```js
lambdavm tx staking delegate VALIDATOR_ADDRESS 1000000ulamb \
--chain-id lambda_92000-1 \
--node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
--from KEY
```

### Redelegate tokens to another validator
```js
lambdavm tx staking redelegate $(lambdavm keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000ulamb \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

### Unbond tokens from your validator
```js
lambdavm tx staking unbond $(lambdavm keys show KEY --bech val -a) ulamb \
  --chain-id andromeda-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

## Governance
### List of all proposals
```js
lambdavm query gov proposals --node https://lambda-rpc.noders.services:443
```
### Check vote
```js
lambdavm query gov proposal PROPOSAL_NUMBER \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
lambdavm tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
lambdavm tx staking create-validator \
  --amount 1000000ulamb \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(lambdavm tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

### Edit validator
```js
lambdavm tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id lambda_92000-1 \
--commission-rate 0.05 \
--from KEY \
--node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
```

### Unjail
```js
lambdavm tx slashing unjail \
  --chain-id lambda_92000-1 \
  --node https://lambda-rpc.noders.services:443 --fees 3000ulamb \
  --from KEY
```

### Jail reason
```js
lambdavm query slashing signing-info $(lambdavm tendermint show-validator)
```

### Validator details
```js
lambdavm q staking validator $(lambdavm keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
lambdavm status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
lambdavm status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(lambdavm tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.lambdavm/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(lambdavm q staking validator $(lambdavm keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(lambdavm status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://lambda-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001ulamb\"/" ~/.lambdavm/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.lambdavm/config/config.toml
```

### Reset chain data
```js
lambdavm tendermint unsafe-reset-all --keep-addr-book --home ~/.lambdavm
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable lambdavm.service
```

### Disable service
```js
sudo systemctl disable lambdavm.service
```

### Start service
```js
sudo systemctl start lambdavm.service
```

### Stop service
```js
sudo systemctl stop lambdavm.service
```

### Restart service
```js
sudo systemctl restart lambdavm.service
```

### Check service status
```js
sudo systemctl status lambdavm.service
```

### Check service logs
```js
sudo journalctl -u lambdavm.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop lambdavm.service
sudo systemctl disable lambdavm.service
sudo rm /etc/systemd/system/lambdavm.service
sudo systemctl daemon-reload
rm -f $(which lambdavm)
rm -rf ~/.lambdavm
rm -rf $HOME/LambdaIM
```
