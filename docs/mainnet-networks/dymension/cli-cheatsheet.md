---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-dymension">
# CLI Cheatsheet
</div>
###### Chain ID: `dymension_1100-1` | Current Node Version: `v3.2.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
dymd keys add KEY
```

### Recover key (via existing mnemonic)
```js
dymd keys add KEY --recover
```

### List all keys
```js
dymd keys list
```

### Delete key
```js
dymd keys delete KEY
```

## Wallet
### Wallet balance
```js
dymd q bank balances $(dymd keys show KEY -a) --node https://dymension-rpc.noders.services:443
```

### Send
```js
dymd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000adym \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

### Withdraw rewards from all validators
```js
dymd tx distribution withdraw-all-rewards \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

### Withdraw Rewards including Commission
```js
dymd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

### Delegate tokens to yourself
```js
dymd tx staking delegate $(dymd keys show KEY --bech val -a) 1000000adym \
--chain-id dymension_1100-1 \
--node https://dymension-rpc.noders.services:443 --fees 300000000adym \
--from KEY
```

### Delegate tokens to validator
```js
dymd tx staking delegate VALIDATOR_ADDRESS 1000000adym \
--chain-id dymension_1100-1 \
--node https://dymension-rpc.noders.services:443 --fees 300000000adym \
--from KEY
```

### Redelegate tokens to another validator
```js
dymd tx staking redelegate $(dymd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000adym \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

### Unbond tokens from your validator
```js
dymd tx staking unbond $(dymd keys show KEY --bech val -a) adym \
  --chain-id andromeda-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

## Governance
### List of all proposals
```js
dymd query gov proposals --node https://dymension-rpc.noders.services:443
```
### Check vote
```js
dymd query gov proposal PROPOSAL_NUMBER \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
dymd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
dymd tx staking create-validator \
  --amount 1000000adym \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(dymd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

### Edit validator
```js
dymd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id dymension_1100-1 \
--commission-rate 0.05 \
--from KEY \
--node https://dymension-rpc.noders.services:443 --fees 300000000adym \
```

### Unjail
```js
dymd tx slashing unjail \
  --chain-id dymension_1100-1 \
  --node https://dymension-rpc.noders.services:443 --fees 300000000adym \
  --from KEY
```

### Jail reason
```js
dymd query slashing signing-info $(dymd tendermint show-validator)
```

### Validator details
```js
dymd q staking validator $(dymd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
dymd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
dymd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(dymd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.dymension/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(dymd q staking validator $(dymd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(dymd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://dymension-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001adym\"/" ~/.dymension/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.dymension/config/config.toml
```

### Reset chain data
```js
dymd tendermint unsafe-reset-all --keep-addr-book --home ~/.dymension
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable dymd
```

### Disable service
```js
sudo systemctl disable dymd
```

### Start service
```js
sudo systemctl start dymd
```

### Stop service
```js
sudo systemctl stop dymd
```

### Restart service
```js
sudo systemctl restart dymd
```

### Check service status
```js
sudo systemctl status dymd
```

### Check service logs
```js
sudo journalctl -u dymd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop dymd
sudo systemctl disable dymd
sudo rm /etc/systemd/system/dymd.service
sudo systemctl daemon-reload
rm -f $(which dymd)
rm -rf ~/.dymension
rm -rf $HOME/dymensionxyz
```
