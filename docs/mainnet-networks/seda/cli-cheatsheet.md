---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-seda">
# CLI Cheatsheet
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
sedad keys add KEY
```

### Recover key (via existing mnemonic)
```js
sedad keys add KEY --recover
```

### List all keys
```js
sedad keys list
```

### Delete key
```js
sedad keys delete KEY
```

## Wallet
### Wallet balance
```js
sedad q bank balances $(sedad keys show KEY -a) --node https://seda-rpc.noders.services:443
```

### Send
```js
sedad tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000aseda \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

### Withdraw rewards from all validators
```js
sedad tx distribution withdraw-all-rewards \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

### Withdraw Rewards including Commission
```js
sedad tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

### Delegate tokens to yourself
```js
sedad tx staking delegate $(sedad keys show KEY --bech val -a) 1000000aseda \
--chain-id auto \
--node https://seda-rpc.noders.services:443 --fees 3000000aseda \
--from KEY
```

### Delegate tokens to validator
```js
sedad tx staking delegate VALIDATOR_ADDRESS 1000000aseda \
--chain-id auto \
--node https://seda-rpc.noders.services:443 --fees 3000000aseda \
--from KEY
```

### Redelegate tokens to another validator
```js
sedad tx staking redelegate $(sedad keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000aseda \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

### Unbond tokens from your validator
```js
sedad tx staking unbond $(sedad keys show KEY --bech val -a) aseda \
  --chain-id andromeda-1 \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

## Governance
### List of all proposals
```js
sedad query gov proposals --node https://seda-rpc.noders.services:443
```
### Check vote
```js
sedad query gov proposal PROPOSAL_NUMBER \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
sedad tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
sedad tx staking create-validator \
  --amount 1000000aseda \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(sedad tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

### Edit validator
```js
sedad tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id auto \
--commission-rate 0.05 \
--from KEY \
--node https://seda-rpc.noders.services:443 --fees 3000000aseda \
```

### Unjail
```js
sedad tx slashing unjail \
  --chain-id auto \
  --node https://seda-rpc.noders.services:443 --fees 3000000aseda \
  --from KEY
```

### Jail reason
```js
sedad query slashing signing-info $(sedad tendermint show-validator)
```

### Validator details
```js
sedad q staking validator $(sedad keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
sedad status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
sedad status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(sedad tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.sedad/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(sedad q staking validator $(sedad keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(sedad status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://seda-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001aseda\"/" ~/.sedad/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.sedad/config/config.toml
```

### Reset chain data
```js
sedad tendermint unsafe-reset-all --keep-addr-book --home ~/.sedad
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable sedad
```

### Disable service
```js
sudo systemctl disable sedad
```

### Start service
```js
sudo systemctl start sedad
```

### Stop service
```js
sudo systemctl stop sedad
```

### Restart service
```js
sudo systemctl restart sedad
```

### Check service status
```js
sudo systemctl status sedad
```

### Check service logs
```js
sudo journalctl -u sedad -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop sedad
sudo systemctl disable sedad
sudo rm /etc/systemd/system/seda.service
sudo systemctl daemon-reload
rm -f $(which sedad)
rm -rf ~/.sedad
rm -rf $HOME/seda-chain
```
