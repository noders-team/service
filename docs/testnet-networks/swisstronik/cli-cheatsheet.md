---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-swisstronik">
# CLI Cheatsheet
</div>
###### Chain ID: `swisstronik_1291-1` | Current Node Version: `v1.0.8`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
swisstronikd keys add KEY
```

### Recover key (via existing mnemonic)
```js
swisstronikd keys add KEY --recover
```

### List all keys
```js
swisstronikd keys list
```

### Delete key
```js
swisstronikd keys delete KEY
```

## Wallet
### Wallet balance
```js
swisstronikd q bank balances $(swisstronikd keys show KEY -a) --node https://swisstronik-t-rpc.noders.services:443
```

### Send
```js
swisstronikd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uswtr \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

### Withdraw rewards from all validators
```js
swisstronikd tx distribution withdraw-all-rewards \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

### Withdraw Rewards including Commission
```js
swisstronikd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

### Delegate tokens to yourself
```js
swisstronikd tx staking delegate $(swisstronikd keys show KEY --bech val -a) 1000000uswtr \
--chain-id swisstronik_1291-1 \
--node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
--from KEY
```

### Delegate tokens to validator
```js
swisstronikd tx staking delegate VALIDATOR_ADDRESS 1000000uswtr \
--chain-id swisstronik_1291-1 \
--node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
--from KEY
```

### Redelegate tokens to another validator
```js
swisstronikd tx staking redelegate $(swisstronikd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uswtr \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

### Unbond tokens from your validator
```js
swisstronikd tx staking unbond $(swisstronikd keys show KEY --bech val -a) uswtr \
  --chain-id andromeda-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

## Governance
### List of all proposals
```js
swisstronikd query gov proposals --node https://swisstronik-t-rpc.noders.services:443
```
### Check vote
```js
swisstronikd query gov proposal PROPOSAL_NUMBER \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
swisstronikd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
swisstronikd tx staking create-validator \
  --amount 1000000uswtr \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(swisstronikd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

### Edit validator
```js
swisstronikd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id swisstronik_1291-1 \
--commission-rate 0.05 \
--from KEY \
--node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
```

### Unjail
```js
swisstronikd tx slashing unjail \
  --chain-id swisstronik_1291-1 \
  --node https://swisstronik-t-rpc.noders.services:443 --fees 20000uswtr \
  --from KEY
```

### Jail reason
```js
swisstronikd query slashing signing-info $(swisstronikd tendermint show-validator)
```

### Validator details
```js
swisstronikd q staking validator $(swisstronikd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
swisstronikd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
swisstronikd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(swisstronikd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.swisstronik/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(swisstronikd q staking validator $(swisstronikd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(swisstronikd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://swisstronik-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uswtr\"/" ~/.swisstronik/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.swisstronik/config/config.toml
```

### Reset chain data
```js
swisstronikd tendermint unsafe-reset-all --keep-addr-book --home ~/.swisstronik
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable swisstronikd
```

### Disable service
```js
sudo systemctl disable swisstronikd
```

### Start service
```js
sudo systemctl start swisstronikd
```

### Stop service
```js
sudo systemctl stop swisstronikd
```

### Restart service
```js
sudo systemctl restart swisstronikd
```

### Check service status
```js
sudo systemctl status swisstronikd
```

### Check service logs
```js
sudo journalctl -u swisstronikd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop swisstronikd
sudo systemctl disable swisstronikd
sudo rm /etc/systemd/system/swisstronik.service
sudo systemctl daemon-reload
rm -f $(which swisstronikd)
rm -rf ~/.swisstronik
rm -rf $HOME/SigmaGmbH
```