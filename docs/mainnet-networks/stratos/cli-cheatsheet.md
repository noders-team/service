---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 7
---

<div class="h1-with-icon icon-stratos">
# CLI Cheatsheet
</div>
###### Chain ID: `` | Current Node Version: `vv0.11.3`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

### Bank: Send
```bash
stchaind tx bank send KEY RECEIVER_ADDRESS 1000000wei \
  --chain-id  \
  --node :443 --fees 3000wei \
  --from KEY
```

### Distribution: Withdraw Rewards including Commission
```bash
stchaind tx distribution withdraw-rewards VALIDATOR_OPERATOR \
  --commission \
  --chain-id  \
  --node :443 --fees 3000wei \
  --from KEY
```

### Gov: Query Proposal
```bash
stchaind query gov proposal PROPOSAL_NUMBER \
  --chain-id  \
  --node :443 --fees 3000wei \
  --output json | jq
```

### Gov: Vote
###### VOTE_OPTION: `yes`, `no`, `no_with_veto` and `abstain`.
```bash
stchaind tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id  \
  --node :443 --fees 3000wei \
  --from KEY
```

### Slashing: Unjail
```bash
stchaind tx slashing unjail \
  --chain-id  \
  --node :443 --fees 3000wei \
  --from KEY
```

### Staking: Create Validator
###### Note: We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
```bash
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
  --chain-id  \
  --node :443 --fees 3000wei \
  --from KEY
```
