#!/bin/bash

for config_file in "mainnet-networks"/*
do
  echo "${config_file}"
  CHAIN_NAME=($(sed -n -e '/CHAIN_NAME/ s/.*\=" *//p' "${config_file}"))
  echo ${CHAIN_NAME}
done