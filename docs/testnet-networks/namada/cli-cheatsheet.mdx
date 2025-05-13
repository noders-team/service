---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-namada">
# CLI Cheatsheet
</div>
###### Chain ID: `housefire-cotton.d3c912fee7462` | Current Node Version: `v0.44.1`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new keypair
```js
namadaw gen --alias KEY
```

### Recover keypair (via existing mnemonic)
```js
namada wallet derive --alias KEY --hd-path default
```

### List your keypair
```js
namadaw find --alias KEY
```

### List all keypair
```js
namadaw list
```

### Remove your keypair
```js
namadaw remove --alias KEY --do-it
```

### Add some tokens using faucet:
```js
https://faucet.heliax.click/
```

## Wallet
### Wallet balance
```js
namadac balance --owner KEY
```

### Send
```js
namadac transfer --source KEY --target RECIPIENT --token NAAN --amount AMOUNT --signing-keys KEY --memo MEMO
```

### Delegate tokens to validator
```js
namadac bond --source KEY --validator VAL_ADDRESS --amount AMOUNT  --memo MEMO
```

### Check your user bonds
```js
namadac bonds --owner KEY
```

### Unbond tokens from validator
```js
namadac unbond --source KEY --validator VAL_ADDRESS --amount AMOUNT  --memo $MEMO
```

### Withdraw unbonded tokens
```js
namadac withdraw --source KEY --validator VAL_ADDRESS  --memo $MEMO
```

### Redelegate bonded tokens
```js
namadac redelegate --owner KEY --source-validator VAL_ADDRESS --destination-validator DESSTINATION_VAL_ADDRESS --amount AMOUNT  --memo MEMO
```

### Claim rewards
```js
namadac claim-rewards --source KEY --validator VAL_ADDRESS  --memo MEMO
```

## Governance
### List of all proposals
```js
namadac query-proposal
```
### Vote
```js
namadac vote-proposal --proposal-id PROPOSAL_ID --vote yay --address KEY --signing-keys KEY --memo MEMO
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable namadad
```

### Disable service
```js
sudo systemctl disable namadad
```

### Start service
```js
sudo systemctl start namadad
```

### Stop service
```js
sudo systemctl stop namadad
```

### Restart service
```js
sudo systemctl restart namadad
```

### Check service status
```js
sudo systemctl status namadad
```

### Check service logs
```js
sudo journalctl -u namadad -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop namadad
sudo systemctl disable namadad
sudo rm /etc/systemd/system/namada.service
sudo systemctl daemon-reload
rm -f $(which namadad)
rm -rf ~/.local
rm -rf $HOME/namada
```