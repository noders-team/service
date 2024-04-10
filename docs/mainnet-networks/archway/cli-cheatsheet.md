---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-archway">
# CLI Cheatsheet
</div>
###### Chain ID: `archway-1` | Current Node Version: `v6.0.2`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
archwayd keys add KEY
```

### Recover key (via existing mnemonic)
```js
archwayd keys add KEY --recover
```

### List all keys
```js
archwayd keys list
```

### Delete key
```js
archwayd keys delete KEY
```

## Wallet
### Wallet balance
```js
archwayd q bank balances $(archwayd keys show KEY -a) --node https://archway-rpc.noders.services:443
```

### Send
```js
archwayd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000aarch \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

### Withdraw rewards from all validators
```js
archwayd tx distribution withdraw-all-rewards \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

### Withdraw Rewards including Commission
```js
archwayd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

### Delegate tokens to yourself
```js
archwayd tx staking delegate $(archwayd keys show KEY --bech val -a) 1000000aarch \
--chain-id archway-1 \
--node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
--from KEY
```

### Delegate tokens to validator
```js
archwayd tx staking delegate VALIDATOR_ADDRESS 1000000aarch \
--chain-id archway-1 \
--node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
--from KEY
```

### Redelegate tokens to another validator
```js
archwayd tx staking redelegate $(archwayd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000aarch \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

### Unbond tokens from your validator
```js
archwayd tx staking unbond $(archwayd keys show KEY --bech val -a) aarch \
  --chain-id andromeda-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

## Governance
### List of all proposals
```js
archwayd query gov proposals --node https://archway-rpc.noders.services:443
```
### Check vote
```js
archwayd query gov proposal PROPOSAL_NUMBER \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
archwayd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
archwayd tx staking create-validator \
  --amount 1000000aarch \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(archwayd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

### Edit validator
```js
archwayd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id archway-1 \
--commission-rate 0.05 \
--from KEY \
--node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
```

### Unjail
```js
archwayd tx slashing unjail \
  --chain-id archway-1 \
  --node https://archway-rpc.noders.services:443 --fees 3000000000aarch \
  --from KEY
```

### Jail reason
```js
archwayd query slashing signing-info $(archwayd tendermint show-validator)
```

### Validator details
```js
archwayd q staking validator $(archwayd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
archwayd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
archwayd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(archwayd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.archwayd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(archwayd q staking validator $(archwayd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(archwayd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://archway-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001aarch\"/" ~/.archwayd/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.archwayd/config/config.toml
```

### Reset chain data
```js
archwayd tendermint unsafe-reset-all --keep-addr-book --home ~/.archwayd
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable archway.service
```

### Disable service
```js
sudo systemctl disable archway.service
```

### Start service
```js
sudo systemctl start archway.service
```

### Stop service
```js
sudo systemctl stop archway.service
```

### Restart service
```js
sudo systemctl restart archway.service
```

### Check service status
```js
sudo systemctl status archway.service
```

### Check service logs
```js
sudo journalctl -u archway.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop archway.service
sudo systemctl disable archway.service
sudo rm /etc/systemd/system/archway.service
sudo systemctl daemon-reload
rm -f $(which archwayd)
rm -rf ~/.archwayd
rm -rf $HOME/archway-network
```
