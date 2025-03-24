---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-airchains">
# CLI Cheatsheet
</div>
###### Chain ID: `varanasi-1` | Current Node Version: `v0.3.1`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
junctiond keys add KEY
```

### Recover key (via existing mnemonic)
```js
junctiond keys add KEY --recover
```

### List all keys
```js
junctiond keys list
```

### Delete key
```js
junctiond keys delete KEY
```

## Wallet
### Wallet balance
```js
junctiond q bank balances $(junctiond keys show KEY -a) --node https://airchains-t-rpc.noders.services:443
```

### Send
```js
junctiond tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uamf \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

### Withdraw rewards from all validators
```js
junctiond tx distribution withdraw-all-rewards \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

### Withdraw Rewards including Commission
```js
junctiond tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

### Delegate tokens to yourself
```js
junctiond tx staking delegate $(junctiond keys show KEY --bech val -a) 1000000uamf \
--chain-id varanasi-1 \
--node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
--from KEY
```

### Delegate tokens to validator
```js
junctiond tx staking delegate VALIDATOR_ADDRESS 1000000uamf \
--chain-id varanasi-1 \
--node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
--from KEY
```

### Redelegate tokens to another validator
```js
junctiond tx staking redelegate $(junctiond keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uamf \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

### Unbond tokens from your validator
```js
junctiond tx staking unbond $(junctiond keys show KEY --bech val -a) uamf \
  --chain-id andromeda-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

## Governance
### List of all proposals
```js
junctiond query gov proposals --node https://airchains-t-rpc.noders.services:443
```
### Check vote
```js
junctiond query gov proposal PROPOSAL_NUMBER \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
junctiond tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
junctiond tx staking create-validator \
  --amount 1000000uamf \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(junctiond tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

### Edit validator
```js
junctiond tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id varanasi-1 \
--commission-rate 0.05 \
--from KEY \
--node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
```

### Unjail
```js
junctiond tx slashing unjail \
  --chain-id varanasi-1 \
  --node https://airchains-t-rpc.noders.services:443 --fees 3000uamf \
  --from KEY
```

### Jail reason
```js
junctiond query slashing signing-info $(junctiond tendermint show-validator)
```

### Validator details
```js
junctiond q staking validator $(junctiond keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
junctiond status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
junctiond status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(junctiond tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.junction/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(junctiond q staking validator $(junctiond keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(junctiond status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://airchains-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uamf\"/" ~/.junction/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.junction/config/config.toml
```

### Reset chain data
```js
junctiond tendermint unsafe-reset-all --keep-addr-book --home ~/.junction
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable junctiond
```

### Disable service
```js
sudo systemctl disable junctiond
```

### Start service
```js
sudo systemctl start junctiond
```

### Stop service
```js
sudo systemctl stop junctiond
```

### Restart service
```js
sudo systemctl restart junctiond
```

### Check service status
```js
sudo systemctl status junctiond
```

### Check service logs
```js
sudo journalctl -u junctiond -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop junctiond
sudo systemctl disable junctiond
sudo rm /etc/systemd/system/junctiond.service
sudo systemctl daemon-reload
rm -f $(which junctiond)
rm -rf ~/.junction
rm -rf $HOME/junction
```