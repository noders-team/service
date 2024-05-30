---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-initia">
# CLI Cheatsheet
</div>
###### Chain ID: `initiation-1` | Current Node Version: `v0.2.14`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
initiad keys add KEY
```

### Recover key (via existing mnemonic)
```js
initiad keys add KEY --recover
```

### List all keys
```js
initiad keys list
```

### Delete key
```js
initiad keys delete KEY
```

## Wallet
### Wallet balance
```js
initiad q bank balances $(initiad keys show KEY -a) --node https://initia-t-rpc.noders.services:443
```

### Send
```js
initiad tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uinit \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

### Withdraw rewards from all validators
```js
initiad tx distribution withdraw-all-rewards \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

### Withdraw Rewards including Commission
```js
initiad tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

### Delegate tokens to yourself
```js
initiad tx staking delegate $(initiad keys show KEY --bech val -a) 1000000uinit \
--chain-id initiation-1 \
--node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
--from KEY
```

### Delegate tokens to validator
```js
initiad tx staking delegate VALIDATOR_ADDRESS 1000000uinit \
--chain-id initiation-1 \
--node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
--from KEY
```

### Redelegate tokens to another validator
```js
initiad tx staking redelegate $(initiad keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uinit \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

### Unbond tokens from your validator
```js
initiad tx staking unbond $(initiad keys show KEY --bech val -a) uinit \
  --chain-id andromeda-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

## Governance
### List of all proposals
```js
initiad query gov proposals --node https://initia-t-rpc.noders.services:443
```
### Check vote
```js
initiad query gov proposal PROPOSAL_NUMBER \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
initiad tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
initiad tx staking create-validator \
  --amount 1000000uinit \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(initiad tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

### Edit validator
```js
initiad tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id initiation-1 \
--commission-rate 0.05 \
--from KEY \
--node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
```

### Unjail
```js
initiad tx slashing unjail \
  --chain-id initiation-1 \
  --node https://initia-t-rpc.noders.services:443 --fees 3000uinit \
  --from KEY
```

### Jail reason
```js
initiad query slashing signing-info $(initiad tendermint show-validator)
```

### Validator details
```js
initiad q staking validator $(initiad keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
initiad status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
initiad status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(initiad tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.initiad/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(initiad q staking validator $(initiad keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(initiad status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://initia-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uinit\"/" ~/.initiad/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.initiad/config/config.toml
```

### Reset chain data
```js
initiad tendermint unsafe-reset-all --keep-addr-book --home ~/.initiad
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable initiad
```

### Disable service
```js
sudo systemctl disable initiad
```

### Start service
```js
sudo systemctl start initiad
```

### Stop service
```js
sudo systemctl stop initiad
```

### Restart service
```js
sudo systemctl restart initiad
```

### Check service status
```js
sudo systemctl status initiad
```

### Check service logs
```js
sudo journalctl -u initiad -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop initiad
sudo systemctl disable initiad
sudo rm /etc/systemd/system/initiad.service
sudo systemctl daemon-reload
rm -f $(which initiad)
rm -rf ~/.initiad
rm -rf $HOME/initia
```
