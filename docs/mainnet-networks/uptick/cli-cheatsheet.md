---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-uptick">
# CLI Cheatsheet
</div>
###### Chain ID: `uptick_117-1` | Current Node Version: `v0.2.19`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
uptickd keys add KEY
```

### Recover key (via existing mnemonic)
```js
uptickd keys add KEY --recover
```

### List all keys
```js
uptickd keys list
```

### Delete key
```js
uptickd keys delete KEY
```

## Wallet
### Wallet balance
```js
uptickd q bank balances $(uptickd keys show KEY -a) --node https://uptick-rpc.noders.services:443
```

### Send
```js
uptickd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000auptick \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

### Withdraw rewards from all validators
```js
uptickd tx distribution withdraw-all-rewards \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

### Withdraw Rewards including Commission
```js
uptickd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

### Delegate tokens to yourself
```js
uptickd tx staking delegate $(uptickd keys show KEY --bech val -a) 1000000auptick \
--chain-id uptick_117-1 \
--node https://uptick-rpc.noders.services:443 --fees 3000auptick \
--from KEY
```

### Delegate tokens to validator
```js
uptickd tx staking delegate VALIDATOR_ADDRESS 1000000auptick \
--chain-id uptick_117-1 \
--node https://uptick-rpc.noders.services:443 --fees 3000auptick \
--from KEY
```

### Redelegate tokens to another validator
```js
uptickd tx staking redelegate $(uptickd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000auptick \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

### Unbond tokens from your validator
```js
uptickd tx staking unbond $(uptickd keys show KEY --bech val -a) auptick \
  --chain-id andromeda-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

## Governance
### List of all proposals
```js
uptickd query gov proposals --node https://uptick-rpc.noders.services:443
```
### Check vote
```js
uptickd query gov proposal PROPOSAL_NUMBER \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
uptickd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
uptickd tx staking create-validator \
  --amount 1000000auptick \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(uptickd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

### Edit validator
```js
uptickd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id uptick_117-1 \
--commission-rate 0.05 \
--from KEY \
--node https://uptick-rpc.noders.services:443 --fees 3000auptick \
```

### Unjail
```js
uptickd tx slashing unjail \
  --chain-id uptick_117-1 \
  --node https://uptick-rpc.noders.services:443 --fees 3000auptick \
  --from KEY
```

### Jail reason
```js
uptickd query slashing signing-info $(uptickd tendermint show-validator)
```

### Validator details
```js
uptickd q staking validator $(uptickd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
uptickd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
uptickd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(uptickd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.uptickd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(uptickd q staking validator $(uptickd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(uptickd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://uptick-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001auptick\"/" ~/.uptickd/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.uptickd/config/config.toml
```

### Reset chain data
```js
uptickd tendermint unsafe-reset-all --keep-addr-book --home ~/.uptickd
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable uptickd
```

### Disable service
```js
sudo systemctl disable uptickd
```

### Start service
```js
sudo systemctl start uptickd
```

### Stop service
```js
sudo systemctl stop uptickd
```

### Restart service
```js
sudo systemctl restart uptickd
```

### Check service status
```js
sudo systemctl status uptickd
```

### Check service logs
```js
sudo journalctl -u uptickd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop uptickd
sudo systemctl disable uptickd
sudo rm /etc/systemd/system/uptickd.service
sudo systemctl daemon-reload
rm -f $(which uptickd)
rm -rf ~/.uptickd
rm -rf $HOME/UptickNetwork
```
