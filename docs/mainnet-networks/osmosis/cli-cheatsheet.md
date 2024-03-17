---
hide_table_of_contents: false
title: CLI Cheatsheet*
sidebar_position: 7
---

<div class="h1-with-icon icon-osmosis">
# CLI Cheatsheet
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

### Bank: Send
```bash
celestia-appd tx bank send KEY RECEIVER_ADDRESS 1000000utia \
  --chain-id celestia \
  --node https://celestia-rpc.polkachu.com:443 --fees 420utia \
  --from KEY
```

### Distribution: Withdraw Rewards including Commission
```bash
celestia-appd tx distribution withdraw-rewards VALIDATOR_OPERATOR \
  --commission \
  --chain-id celestia \
  --node https://celestia-rpc.polkachu.com:443 --fees 420utia \
  --from KEY
```

### Gov: Query Proposal
```bash
celestia-appd query gov proposal PROPOSAL_NUMBER \
  --chain-id celestia \
  --node https://celestia-rpc.polkachu.com:443 \
  --output json | jq
```

### Gov: Vote
###### VOTE_OPTION: `yes`, `no`, `no_with_veto` and `abstain`.
```bash
celestia-appd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id celestia \
  --node https://celestia-rpc.polkachu.com:443 --fees 420utia \
  --from KEY
```

### Slashing: Unjail
```bash
celestia-appd tx slashing unjail \
  --chain-id celestia \
  --node https://celestia-rpc.polkachu.com:443 --fees 420utia \
  --from KEY
```

### Staking: Create Validator
###### Note: We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
```bash
celestia-appd tx staking create-validator \
  --amount 1000000utia \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(celestia-appd tendermint show-validator) \
  --moniker 'polkachu.com' \
  --website "https://polkachu.com" \
  --identity "0A6AF02D1557E5B4" \
  --details "Polkachu is the trusted staking service provider for blockchain projects. 100% refund for downtime slash. Contact us at hello@polkachu.com" \
  --security-contact="hello@polkachu.com" \
  --chain-id celestia \
  --node https://celestia-rpc.polkachu.com:443 --fees 420utia \
  --from KEY
```
