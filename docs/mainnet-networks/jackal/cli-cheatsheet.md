---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-jackal">
# CLI Cheatsheet
</div>
###### Chain ID: `jackal-1` | Current Node Version: `vnull`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
canined keys add KEY
```

### Recover key (via existing mnemonic)
```js
canined keys add KEY --recover
```

### List all keys
```js
canined keys list
```

### Delete key
```js
canined keys delete KEY
```

## Wallet
### Wallet balance
```js
canined q bank balances $(canined keys show KEY -a) --node https://jackal-rpc.noders.services:443
```

### Send
```js
canined tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000ujckl \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

### Withdraw rewards from all validators
```js
canined tx distribution withdraw-all-rewards \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

### Withdraw Rewards including Commission
```js
canined tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

### Delegate tokens to yourself
```js
canined tx staking delegate $(canined keys show KEY --bech val -a) 1000000ujckl \
--chain-id jackal-1 \
--node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
--from KEY
```

### Delegate tokens to validator
```js
canined tx staking delegate VALIDATOR_ADDRESS 1000000ujckl \
--chain-id jackal-1 \
--node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
--from KEY
```

### Redelegate tokens to another validator
```js
canined tx staking redelegate $(canined keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000ujckl \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

### Unbond tokens from your validator
```js
canined tx staking unbond $(canined keys show KEY --bech val -a) ujckl \
  --chain-id andromeda-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

## Governance
### List of all proposals
```js
canined query gov proposals --node https://jackal-rpc.noders.services:443
```
### Check vote
```js
canined query gov proposal PROPOSAL_NUMBER \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
canined tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
canined tx staking create-validator \
  --amount 1000000ujckl \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(canined tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

### Edit validator
```js
canined tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id jackal-1 \
--commission-rate 0.05 \
--from KEY \
--node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
```

### Unjail
```js
canined tx slashing unjail \
  --chain-id jackal-1 \
  --node https://jackal-rpc.noders.services:443 --fees 3000ujckl \
  --from KEY
```

### Jail reason
```js
canined query slashing signing-info $(canined tendermint show-validator)
```

### Validator details
```js
canined q staking validator $(canined keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
canined status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
canined status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(canined tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.canine/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(canined q staking validator $(canined keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(canined status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://jackal-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001ujckl\"/" ~/.canine/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.canine/config/config.toml
```

### Reset chain data
```js
canined tendermint unsafe-reset-all --keep-addr-book --home ~/.canine
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable canined.service
```

### Disable service
```js
sudo systemctl disable canined.service
```

### Start service
```js
sudo systemctl start canined.service
```

### Stop service
```js
sudo systemctl stop canined.service
```

### Restart service
```js
sudo systemctl restart canined.service
```

### Check service status
```js
sudo systemctl status canined.service
```

### Check service logs
```js
sudo journalctl -u canined.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop canined.service
sudo systemctl disable canined.service
sudo rm /etc/systemd/system/canined.service
sudo systemctl daemon-reload
rm -f $(which canined)
rm -rf ~/.canine
rm -rf $HOME/canine-chain
```