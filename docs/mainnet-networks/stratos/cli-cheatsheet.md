---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-stratos">
# CLI Cheatsheet
</div>
###### Chain ID: `stratos-1` | Current Node Version: `v0.11.2`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
stchaind keys add KEY
```

### Recover key (via existing mnemonic)
```js
stchaind keys add KEY --recover
```

### List all keys
```js
stchaind keys list
```

### Delete key
```js
stchaind keys delete KEY
```

## Wallet
### Wallet balance
```js
stchaind q bank balances $(stchaind keys show KEY -a) --node https://stratos-rpc.noders.services:443
```

### Send
```js
stchaind tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000wei \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

### Withdraw rewards from all validators
```js
stchaind tx distribution withdraw-all-rewards \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

### Withdraw Rewards including Commission
```js
stchaind tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

### Delegate tokens to yourself
```js
stchaind tx staking delegate $(stchaind keys show KEY --bech val -a) 1000000wei \
--chain-id stratos-1 \
--node https://stratos-rpc.noders.services:443 --fees 3000wei \
--from KEY
```

### Delegate tokens to validator
```js
stchaind tx staking delegate VALIDATOR_ADDRESS 1000000wei \
--chain-id stratos-1 \
--node https://stratos-rpc.noders.services:443 --fees 3000wei \
--from KEY
```

### Redelegate tokens to another validator
```js
stchaind tx staking redelegate $(stchaind keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000wei \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

### Unbond tokens from your validator
```js
stchaind tx staking unbond $(stchaind keys show KEY --bech val -a) wei \
  --chain-id andromeda-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

## Governance
### List of all proposals
```js
stchaind query gov proposals --node https://stratos-rpc.noders.services:443
```
### Check vote
```js
stchaind query gov proposal PROPOSAL_NUMBER \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
stchaind tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
stchaind tx staking create-validator \
  --amount 1000000wei \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(stchaind tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

### Edit validator
```js
stchaind tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id stratos-1 \
--commission-rate 0.05 \
--from KEY \
--node https://stratos-rpc.noders.services:443 --fees 3000wei \
```

### Unjail
```js
stchaind tx slashing unjail \
  --chain-id stratos-1 \
  --node https://stratos-rpc.noders.services:443 --fees 3000wei \
  --from KEY
```

### Jail reason
```js
stchaind query slashing signing-info $(stchaind tendermint show-validator)
```

### Validator details
```js
stchaind q staking validator $(stchaind keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
stchaind status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
stchaind status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(stchaind tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.stchaind/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(stchaind q staking validator $(stchaind keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(stchaind status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://stratos-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001wei\"/" ~/.stchaind/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.stchaind/config/config.toml
```

### Reset chain data
```js
stchaind tendermint unsafe-reset-all --keep-addr-book --home ~/.stchaind
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable stchaind.service
```

### Disable service
```js
sudo systemctl disable stchaind.service
```

### Start service
```js
sudo systemctl start stchaind.service
```

### Stop service
```js
sudo systemctl stop stchaind.service
```

### Restart service
```js
sudo systemctl restart stchaind.service
```

### Check service status
```js
sudo systemctl status stchaind.service
```

### Check service logs
```js
sudo journalctl -u stchaind.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop stchaind.service
sudo systemctl disable stchaind.service
sudo rm /etc/systemd/system/stchaind.service
sudo systemctl daemon-reload
rm -f $(which stchaind)
rm -rf ~/.stchaind
rm -rf $HOME/stratos-chain
```
