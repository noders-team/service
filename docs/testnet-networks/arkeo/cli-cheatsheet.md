---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-arkeo">
# CLI Cheatsheet
</div>
###### Chain ID: `arkeo-testnet-3` | Current Node Version: `v1.0.0-prerelease`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
arkeod keys add KEY
```

### Recover key (via existing mnemonic)
```js
arkeod keys add KEY --recover
```

### List all keys
```js
arkeod keys list
```

### Delete key
```js
arkeod keys delete KEY
```

## Wallet
### Wallet balance
```js
arkeod q bank balances $(arkeod keys show KEY -a) --node https://arkeo-t-rpc.noders.services:443
```

### Send
```js
arkeod tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uarkeo \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Withdraw rewards from all validators
```js
arkeod tx distribution withdraw-all-rewards \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Withdraw Rewards including Commission
```js
arkeod tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Delegate tokens to yourself
```js
arkeod tx staking delegate $(arkeod keys show KEY --bech val -a) 1000000abgt \
--chain-id arkeo-testnet-3 \
--node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
--from KEY
```

### Delegate tokens to validator
```js
arkeod tx staking delegate VALIDATOR_ADDRESS 1000000abgt \
--chain-id arkeo-testnet-3 \
--node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
--from KEY
```

### Redelegate tokens to another validator
```js
arkeod tx staking redelegate $(arkeod keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000abgt \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Unbond tokens from your validator
```js
arkeod tx staking unbond $(arkeod keys show KEY --bech val -a) abgt \
  --chain-id andromeda-1 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

## Governance
### List of all proposals
```js
arkeod query gov proposals --node https://arkeo-t-rpc.noders.services:443
```
### Check vote
```js
arkeod query gov proposal PROPOSAL_NUMBER \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
arkeod tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
arkeod tx staking create-validator \
  --amount 1000000abgt \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(arkeod tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Edit validator
```js
arkeod tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id arkeo-testnet-3 \
--commission-rate 0.05 \
--from KEY \
--node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
```

### Unjail
```js
arkeod tx slashing unjail \
  --chain-id arkeo-testnet-3 \
  --node https://arkeo-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Jail reason
```js
arkeod query slashing signing-info $(arkeod tendermint show-validator)
```

### Validator details
```js
arkeod q staking validator $(arkeod keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
arkeod status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
arkeod status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(arkeod tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.arkeo/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(arkeod q staking validator $(arkeod keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(arkeod status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://arkeo-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001abgt\"/" ~/.arkeo/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.arkeo/config/config.toml
```

### Reset chain data
```js
arkeod tendermint unsafe-reset-all --keep-addr-book --home ~/.arkeo
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable arkeod
```

### Disable service
```js
sudo systemctl disable arkeod
```

### Start service
```js
sudo systemctl start arkeod
```

### Stop service
```js
sudo systemctl stop arkeod
```

### Restart service
```js
sudo systemctl restart arkeod
```

### Check service status
```js
sudo systemctl status arkeod
```

### Check service logs
```js
sudo journalctl -u arkeod -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop arkeod
sudo systemctl disable arkeod
sudo rm /etc/systemd/system/arkeo.service
sudo systemctl daemon-reload
rm -f $(which arkeod)
rm -rf ~/.arkeo
rm -rf $HOME/arkeonetwork
```