---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-bitsong">
# CLI Cheatsheet
</div>
###### Chain ID: `bitsong-2b` | Current Node Version: `v0.15.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
bitsongd keys add KEY
```

### Recover key (via existing mnemonic)
```js
bitsongd keys add KEY --recover
```

### List all keys
```js
bitsongd keys list
```

### Delete key
```js
bitsongd keys delete KEY
```

## Wallet
### Wallet balance
```js
bitsongd q bank balances $(bitsongd keys show KEY -a) --node https://bitsong-rpc.noders.services:443
```

### Send
```js
bitsongd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000ubtsg \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

### Withdraw rewards from all validators
```js
bitsongd tx distribution withdraw-all-rewards \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

### Withdraw Rewards including Commission
```js
bitsongd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

### Delegate tokens to yourself
```js
bitsongd tx staking delegate $(bitsongd keys show KEY --bech val -a) 1000000ubtsg \
--chain-id bitsong-2b \
--node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
--from KEY
```

### Delegate tokens to validator
```js
bitsongd tx staking delegate VALIDATOR_ADDRESS 1000000ubtsg \
--chain-id bitsong-2b \
--node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
--from KEY
```

### Redelegate tokens to another validator
```js
bitsongd tx staking redelegate $(bitsongd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000ubtsg \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

### Unbond tokens from your validator
```js
bitsongd tx staking unbond $(bitsongd keys show KEY --bech val -a) ubtsg \
  --chain-id andromeda-1 \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

## Governance
### List of all proposals
```js
bitsongd query gov proposals --node https://bitsong-rpc.noders.services:443
```
### Check vote
```js
bitsongd query gov proposal PROPOSAL_NUMBER \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
bitsongd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
bitsongd tx staking create-validator \
  --amount 1000000ubtsg \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(bitsongd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

### Edit validator
```js
bitsongd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id bitsong-2b \
--commission-rate 0.05 \
--from KEY \
--node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
```

### Unjail
```js
bitsongd tx slashing unjail \
  --chain-id bitsong-2b \
  --node https://bitsong-rpc.noders.services:443 --fees 3000ubtsg \
  --from KEY
```

### Jail reason
```js
bitsongd query slashing signing-info $(bitsongd tendermint show-validator)
```

### Validator details
```js
bitsongd q staking validator $(bitsongd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
bitsongd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
bitsongd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(bitsongd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.bitsongd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(bitsongd q staking validator $(bitsongd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(bitsongd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://bitsong-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001ubtsg\"/" ~/.bitsongd/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.bitsongd/config/config.toml
```

### Reset chain data
```js
bitsongd tendermint unsafe-reset-all --keep-addr-book --home ~/.bitsongd
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable bitsongd.service
```

### Disable service
```js
sudo systemctl disable bitsongd.service
```

### Start service
```js
sudo systemctl start bitsongd.service
```

### Stop service
```js
sudo systemctl stop bitsongd.service
```

### Restart service
```js
sudo systemctl restart bitsongd.service
```

### Check service status
```js
sudo systemctl status bitsongd.service
```

### Check service logs
```js
sudo journalctl -u bitsongd.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop bitsongd.service
sudo systemctl disable bitsongd.service
sudo rm /etc/systemd/system/bitsongd.service
sudo systemctl daemon-reload
rm -f $(which bitsongd)
rm -rf ~/.bitsongd
rm -rf $HOME/bitsongofficial
```