---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-artela">
# CLI Cheatsheet
</div>
###### Chain ID: `artela_11822-1` | Current Node Version: `v0.4.7-rc6`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
artelad keys add KEY
```

### Recover key (via existing mnemonic)
```js
artelad keys add KEY --recover
```

### List all keys
```js
artelad keys list
```

### Delete key
```js
artelad keys delete KEY
```

## Wallet
### Wallet balance
```js
artelad q bank balances $(artelad keys show KEY -a) --node https://artela-t-rpc.noders.services:443
```

### Send
```js
artelad tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uart \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

### Withdraw rewards from all validators
```js
artelad tx distribution withdraw-all-rewards \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

### Withdraw Rewards including Commission
```js
artelad tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

### Delegate tokens to yourself
```js
artelad tx staking delegate $(artelad keys show KEY --bech val -a) 1000000uart \
--chain-id artela_11822-1 \
--node https://artela-t-rpc.noders.services:443 --fees 3000uart \
--from KEY
```

### Delegate tokens to validator
```js
artelad tx staking delegate VALIDATOR_ADDRESS 1000000uart \
--chain-id artela_11822-1 \
--node https://artela-t-rpc.noders.services:443 --fees 3000uart \
--from KEY
```

### Redelegate tokens to another validator
```js
artelad tx staking redelegate $(artelad keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uart \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

### Unbond tokens from your validator
```js
artelad tx staking unbond $(artelad keys show KEY --bech val -a) uart \
  --chain-id andromeda-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

## Governance
### List of all proposals
```js
artelad query gov proposals --node https://artela-t-rpc.noders.services:443
```
### Check vote
```js
artelad query gov proposal PROPOSAL_NUMBER \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
artelad tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
artelad tx staking create-validator \
  --amount 1000000uart \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(artelad tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

### Edit validator
```js
artelad tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id artela_11822-1 \
--commission-rate 0.05 \
--from KEY \
--node https://artela-t-rpc.noders.services:443 --fees 3000uart \
```

### Unjail
```js
artelad tx slashing unjail \
  --chain-id artela_11822-1 \
  --node https://artela-t-rpc.noders.services:443 --fees 3000uart \
  --from KEY
```

### Jail reason
```js
artelad query slashing signing-info $(artelad tendermint show-validator)
```

### Validator details
```js
artelad q staking validator $(artelad keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
artelad status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
artelad status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(artelad tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.artelad/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(artelad q staking validator $(artelad keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(artelad status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://artela-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uart\"/" ~/.artelad/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.artelad/config/config.toml
```

### Reset chain data
```js
artelad tendermint unsafe-reset-all --keep-addr-book --home ~/.artelad
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable artela.service
```

### Disable service
```js
sudo systemctl disable artela.service
```

### Start service
```js
sudo systemctl start artela.service
```

### Stop service
```js
sudo systemctl stop artela.service
```

### Restart service
```js
sudo systemctl restart artela.service
```

### Check service status
```js
sudo systemctl status artela.service
```

### Check service logs
```js
sudo journalctl -u artela.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop artela.service
sudo systemctl disable artela.service
sudo rm /etc/systemd/system/artela.service
sudo systemctl daemon-reload
rm -f $(which artelad)
rm -rf ~/.artelad
rm -rf $HOME/artela-network
```