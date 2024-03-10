---
sidebar_position: 6
---

# Snapshot

```bash
# Install dependencies, if needed
sudo apt update
sudo apt install lz4 -y
```

```bash
sudo systemctl stop andromedad

cp $HOME/.andromeda/data/priv_validator_state.json $HOME/.andromeda/priv_validator_state.json.backup

andromedad tendermint unsafe-reset-all --home $HOME/.andromeda --keep-addr-book
curl https://snapshots.nodejumper.io/andromeda/andromeda_latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.andromeda

mv $HOME/.andromeda/priv_validator_state.json.backup $HOME/.andromeda/data/priv_validator_state.json

sudo systemctl restart andromedad
sudo journalctl -u andromedad -f --no-hostname -o cat
```