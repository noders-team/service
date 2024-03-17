#!/bin/bash

#####################################################################################################################################################################
#                                                                    GATHER BLOCKCHAIN DATA                                                                         #
#####################################################################################################################################################################

function readBlockchainConfig {
  # Blockchain
  CHAIN_NAME=$(grep -oE '^CHAIN_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DESCRIPTION=$(grep -oE '^CHAIN_DESCRIPTION=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_SYSTEM_NAME=$(grep -oE '^CHAIN_SYSTEM_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Binary
  DAEMON_NAME=$(grep -oE '^DAEMON_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_VERSION=$(grep -oE '^DAEMON_VERSION=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_SERVICE=$(grep -oE '^DAEMON_SERVICE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_HOME=$(grep -oE '^DAEMON_HOME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Endpoints
  ENDPOINT_RPC=$(grep -oE '^ENDPOINT_RPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_API=$(grep -oE '^ENDPOINT_API=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_GRPCWEB=$(grep -oE '^ENDPOINT_GRPCWEB=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_GRPC=$(grep -oE '^ENDPOINT_GRPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Social
  SOCIAL_WEBSITE=$(grep -oE '^SOCIAL_WEBSITE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_GITHUB=$(grep -oE '^SOCIAL_GITHUB=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_DISCORD=$(grep -oE '^SOCIAL_DISCORD=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_X=$(grep -oE '^SOCIAL_X=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_TELEGRAM=$(grep -oE '^SOCIAL_TELEGRAM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Download
  DOWNLOAD_URL=$(grep -oE '^DOWNLOAD_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Updates
  UPDATE_LIVE_PEERS=$(grep -oE '^UPDATE_LIVE_PEERS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
}





function updateLivePeers {
  # Live peers
  LIVE_PEERS_COUNT=""
  LIVE_PEERS_ALL=""
  LIVE_PEERS_RANDOM=""

  if [ "$UPDATE_LIVE_PEERS" = true ] ; then
    # Gathering live peers
    raw_live_peers=$(curl -Ls https://snapshots.mainnet.noders.team/osmosis/live_peers.txt)

    # Variables
    LIVE_PEERS_COUNT=$(echo "${raw_live_peers}" | wc -l)
    LIVE_PEERS_ALL=$(echo "${raw_live_peers}" | paste -sd "," -)
    LIVE_PEERS_RANDOM=$(echo "${raw_live_peers}" | sort --random-sort | head -n 5 | paste -sd "," -)

    # Update page
    cp "../docs/mainnet-networks/template/live-peers.md" "../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"
    perl -pi -e "s/\[LIVE_PEERS_COUNT\]/$LIVE_PEERS_COUNT/g" "../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"
    #sed -e "s/LIVE_PEERS_COUNT/${LIVE_PEERS_COUNT}/g" "../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"


    #sed -i "s/LIVE_PEERS_COUNT/OKAY/g" "../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"

    #sed -i "s/live/okey/g" "/Users/slazarev/Documents/GitHub/services-docusaurus/config/docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"


    #value="$(cat "../docs/mainnet-networks/template/live-peers.md")"
    #echo "${value}" > "../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"

  fi
}


#####################################################################################################################################################################
#                                                                              INSTALL                                                                              #
#####################################################################################################################################################################
for config_file in "mainnet-networks"/*
do
  echo "${config_file}"
  readBlockchainConfig "${config_file}"
  updateLivePeers

  #echo ${LIVE_PEERS_RANDOM}
done
