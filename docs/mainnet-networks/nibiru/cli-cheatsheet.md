---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-nibiru">
# CLI Cheatsheet
</div>
###### Chain ID: `cataclysm-1` | Current Node Version: `v1.3.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
nibid keys add KEY
```

### Recover key (via existing mnemonic)
```js
nibid keys add KEY --recover
```

### List all keys
```js
nibid keys list
```

### Delete key
```js
nibid keys delete KEY
```

## Wallet
### Wallet balance
```js
nibid q bank balances $(nibid keys show KEY -a) --node https://nibiru-rpc.noders.services:443
```

### Send
```js
nibid tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000unibi \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

### Withdraw rewards from all validators
```js
nibid tx distribution withdraw-all-rewards \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

### Withdraw Rewards including Commission
```js
nibid tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

### Delegate tokens to yourself
```js
nibid tx staking delegate $(nibid keys show KEY --bech val -a) 1000000unibi \
--chain-id cataclysm-1 \
--node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
--from KEY
```

### Delegate tokens to validator
```js
nibid tx staking delegate VALIDATOR_ADDRESS 1000000unibi \
--chain-id cataclysm-1 \
--node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
--from KEY
```

### Redelegate tokens to another validator
```js
nibid tx staking redelegate $(nibid keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000unibi \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

### Unbond tokens from your validator
```js
nibid tx staking unbond $(nibid keys show KEY --bech val -a) unibi \
  --chain-id andromeda-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

## Governance
### List of all proposals
```js
nibid query gov proposals --node https://nibiru-rpc.noders.services:443
```
### Check vote
```js
nibid query gov proposal PROPOSAL_NUMBER \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
nibid tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
nibid tx staking create-validator \
  --amount 1000000unibi \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(nibid tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

### Edit validator
```js
nibid tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id cataclysm-1 \
--commission-rate 0.05 \
--from KEY \
--node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
```

### Unjail
```js
nibid tx slashing unjail \
  --chain-id cataclysm-1 \
  --node https://nibiru-rpc.noders.services:443 --fees 3000unibi \
  --from KEY
```

### Jail reason
```js
nibid query slashing signing-info $(nibid tendermint show-validator)
```

### Validator details
```js
nibid q staking validator $(nibid keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
nibid status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
nibid status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(nibid tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.nibid/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(nibid q staking validator $(nibid keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(nibid status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://nibiru-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001unibi\"/" ~/.nibid/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.nibid/config/config.toml
```

### Reset chain data
```js
nibid tendermint unsafe-reset-all --keep-addr-book --home ~/.nibid
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable nibid
```

### Disable service
```js
sudo systemctl disable nibid
```

### Start service
```js
sudo systemctl start nibid
```

### Stop service
```js
sudo systemctl stop nibid
```

### Restart service
```js
sudo systemctl restart nibid
```

### Check service status
```js
sudo systemctl status nibid
```

### Check service logs
```js
sudo journalctl -u nibid -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop nibid
sudo systemctl disable nibid
sudo rm /etc/systemd/system/nibid.service
sudo systemctl daemon-reload
rm -f $(which nibid)
rm -rf ~/.nibid
rm -rf $HOME/NibiruChain
```
