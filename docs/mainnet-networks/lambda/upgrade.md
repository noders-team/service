---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-lambda">
# Upgrade
</div>
###### Chain ID: `lambda_92000-1` | Current Node Version: `v1.0.1`


# Clone Lambda repository
```js
cd $HOME
rm -rf LambdaIM
git clone https://github.com/LambdaIM.git
cd LambdaIM
git checkout v1.0.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.lambdavm/cosmovisor/upgrades/v1.0.1/bin
mv build/lambdavm ~/.lambdavm/cosmovisor/upgrades/v1.0.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Lambda repository
```js
cd $HOME
rm -rf LambdaIM
git clone https://github.com/LambdaIM.git
cd LambdaIM
git checkout v1.0.1
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart lambdavm && sudo journalctl -u lambdavm -f --no-hostname -o cat
```