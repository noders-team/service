---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-injective">
# CLI Cheatsheet
</div>
###### Chain ID: `injective-1` | Current Node Version: `v1.12.1`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
injectived keys add KEY
```

### Recover key (via existing mnemonic)
```js
injectived keys add KEY --recover
```

### List all keys
```js
injectived keys list
```

### Delete key
```js
injectived keys delete KEY
```

## Wallet
### Wallet balance
```js
injectived q bank balances $(injectived keys show KEY -a) --node https://injective-rpc.noders.services:443
```

### Send
```js
injectived tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000inj \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

### Withdraw rewards from all validators
```js
injectived tx distribution withdraw-all-rewards \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

### Withdraw Rewards including Commission
```js
injectived tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

### Delegate tokens to yourself
```js
injectived tx staking delegate $(injectived keys show KEY --bech val -a) 1000000inj \
--chain-id injective-1 \
--node https://injective-rpc.noders.services:443 --fees 3000inj \
--from KEY
```

### Delegate tokens to validator
```js
injectived tx staking delegate VALIDATOR_ADDRESS 1000000inj \
--chain-id injective-1 \
--node https://injective-rpc.noders.services:443 --fees 3000inj \
--from KEY
```

### Redelegate tokens to another validator
```js
injectived tx staking redelegate $(injectived keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000inj \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

### Unbond tokens from your validator
```js
injectived tx staking unbond $(injectived keys show KEY --bech val -a) inj \
  --chain-id andromeda-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

## Governance
### List of all proposals
```js
injectived query gov proposals --node https://injective-rpc.noders.services:443
```
### Check vote
```js
injectived query gov proposal PROPOSAL_NUMBER \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
injectived tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
injectived tx staking create-validator \
  --amount 1000000inj \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(injectived tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

### Edit validator
```js
injectived tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id injective-1 \
--commission-rate 0.05 \
--from KEY \
--node https://injective-rpc.noders.services:443 --fees 3000inj \
```

### Unjail
```js
injectived tx slashing unjail \
  --chain-id injective-1 \
  --node https://injective-rpc.noders.services:443 --fees 3000inj \
  --from KEY
```

### Jail reason
```js
injectived query slashing signing-info $(injectived tendermint show-validator)
```

### Validator details
```js
injectived q staking validator $(injectived keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
injectived status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
injectived status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(injectived tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.injectived/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(injectived q staking validator $(injectived keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(injectived status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://injective-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001inj\"/" ~/.injectived/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.injectived/config/config.toml
```

### Reset chain data
```js
injectived tendermint unsafe-reset-all --keep-addr-book --home ~/.injectived
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable injectived
```

### Disable service
```js
sudo systemctl disable injectived
```

### Start service
```js
sudo systemctl start injectived
```

### Stop service
```js
sudo systemctl stop injectived
```

### Restart service
```js
sudo systemctl restart injectived
```

### Check service status
```js
sudo systemctl status injectived
```

### Check service logs
```js
sudo journalctl -u injectived -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop injectived
sudo systemctl disable injectived
sudo rm /etc/systemd/system/injectived.service
sudo systemctl daemon-reload
rm -f $(which injectived)
rm -rf ~/.injectived
rm -rf $HOME/InjectiveLabs
```
