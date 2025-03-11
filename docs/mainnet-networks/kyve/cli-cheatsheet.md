---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-kyve">
# CLI Cheatsheet
</div>
###### Chain ID: `auto` | Current Node Version: `v1.5.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
kyved keys add KEY
```

### Recover key (via existing mnemonic)
```js
kyved keys add KEY --recover
```

### List all keys
```js
kyved keys list
```

### Delete key
```js
kyved keys delete KEY
```

## Wallet
### Wallet balance
```js
kyved q bank balances $(kyved keys show KEY -a) --node https://kyve-rpc.noders.services:443
```

### Send
```js
kyved tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000ukyve \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

### Withdraw rewards from all validators
```js
kyved tx distribution withdraw-all-rewards \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

### Withdraw Rewards including Commission
```js
kyved tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

### Delegate tokens to yourself
```js
kyved tx staking delegate $(kyved keys show KEY --bech val -a) 1000000ukyve \
--chain-id auto \
--node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
--from KEY
```

### Delegate tokens to validator
```js
kyved tx staking delegate VALIDATOR_ADDRESS 1000000ukyve \
--chain-id auto \
--node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
--from KEY
```

### Redelegate tokens to another validator
```js
kyved tx staking redelegate $(kyved keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000ukyve \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

### Unbond tokens from your validator
```js
kyved tx staking unbond $(kyved keys show KEY --bech val -a) ukyve \
  --chain-id andromeda-1 \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

## Governance
### List of all proposals
```js
kyved query gov proposals --node https://kyve-rpc.noders.services:443
```
### Check vote
```js
kyved query gov proposal PROPOSAL_NUMBER \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
kyved tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
kyved tx staking create-validator \
  --amount 1000000ukyve \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(kyved tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

### Edit validator
```js
kyved tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id auto \
--commission-rate 0.05 \
--from KEY \
--node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
```

### Unjail
```js
kyved tx slashing unjail \
  --chain-id auto \
  --node https://kyve-rpc.noders.services:443 --fees 3000ukyve \
  --from KEY
```

### Jail reason
```js
kyved query slashing signing-info $(kyved tendermint show-validator)
```

### Validator details
```js
kyved q staking validator $(kyved keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
kyved status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
kyved status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(kyved tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.kyve/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(kyved q staking validator $(kyved keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(kyved status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://kyve-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001ukyve\"/" ~/.kyve/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.kyve/config/config.toml
```

### Reset chain data
```js
kyved tendermint unsafe-reset-all --keep-addr-book --home ~/.kyve
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable kyved
```

### Disable service
```js
sudo systemctl disable kyved
```

### Start service
```js
sudo systemctl start kyved
```

### Stop service
```js
sudo systemctl stop kyved
```

### Restart service
```js
sudo systemctl restart kyved
```

### Check service status
```js
sudo systemctl status kyved
```

### Check service logs
```js
sudo journalctl -u kyved -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop kyved
sudo systemctl disable kyved
sudo rm /etc/systemd/system/kyved.service
sudo systemctl daemon-reload
rm -f $(which kyved)
rm -rf ~/.kyve
rm -rf $HOME/KYVENetwork
```
