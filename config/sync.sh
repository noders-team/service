#!/bin/bash

#####################################################################################################################################################################
#                                                                    GATHER BLOCKCHAIN DATA                                                                         #
#####################################################################################################################################################################

function readBlockchainConfig {
  # Blockchain
  CHAIN_NAME=$(grep -oE '^CHAIN_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_SYSTEM_NAME=$(grep -oE '^CHAIN_SYSTEM_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DESCRIPTION=$(awk '/^CHAIN_DESCRIPTION="""/,/^\[CHAIN_DESCRIPTION_END\]/{if (!/^CHAIN_DESCRIPTION="""/ && !/^\[CHAIN_DESCRIPTION_END\]/ && !/^"""/) print}' "${config_file}")
  CHAIN_ID=$(grep -oE '^CHAIN_ID=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DENOM=$(grep -oE '^CHAIN_DENOM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_FEES=$(grep -oE '^CHAIN_FEES=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Binary
  DAEMON_NAME=$(grep -oE '^DAEMON_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  VERSION=$(grep -oE '^VERSION=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_SERVICE=$(grep -oE '^DAEMON_SERVICE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_HOME=$(grep -oE '^DAEMON_HOME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Endpoints
  ENDPOINT_RPC=$(grep -oE '^ENDPOINT_RPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_API=$(grep -oE '^ENDPOINT_API=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_JRPC=$(grep -oE '^ENDPOINT_JRPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_GRPC=$(grep -oE '^ENDPOINT_GRPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_PEER=$(grep -oE '^ENDPOINT_PEER=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_COSMOSLIST=$(grep -oE '^ENDPOINT_COSMOSLIST=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  ENDPOINT_RPC_BLOCK=""
  ENDPOINT_API_BLOCK=""
  ENDPOINT_JRPC_BLOCK=""
  ENDPOINT_GRPC_BLOCK=""
  ENDPOINT_COSMOSLIST_BLOCK=""

  # Social
  SOCIAL_WEBSITE=$(grep -oE '^SOCIAL_WEBSITE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_GITHUB=$(grep -oE '^SOCIAL_GITHUB=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_DISCORD=$(grep -oE '^SOCIAL_DISCORD=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_X=$(grep -oE '^SOCIAL_X=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_TELEGRAM=$(grep -oE '^SOCIAL_TELEGRAM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  SOCIAL_WEBSITE_BLOCK=""
  SOCIAL_GITHUB_BLOCK=""
  SOCIAL_SOCIAL_DISCORD_BLOCK=""
  SOCIAL_X_BLOCK=""
  SOCIAL_TELEGRAM_BLOCK=""


  # Other
  DOWNLOAD_URL=$(grep -oE '^DOWNLOAD_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  GITHUB_FOLDER_NAME=$(grep -oE '^GITHUB_FOLDER_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  VALIDATOR_LINK=$(grep -oE '^VALIDATOR_LINK=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  LIVE_PEERS_COUNT=""
  LIVE_PEERS_ALL=""
  LIVE_PEERS_RANDOM=""
  TIMESTAMP=""
  SIZE=""
  VERSION_HAND=$(grep -oE '^VERSION_HAND=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')


  # Updates
  UPDATE_MAIN=$(grep -oE '^UPDATE_MAIN=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_CATEGORY=$(grep -oE '^UPDATE_CATEGORY=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_INSTALL=$(grep -oE '^UPDATE_INSTALL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_UPGRADE=$(grep -oE '^UPDATE_UPGRADE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_SNAPSHOT=$(grep -oE '^UPDATE_SNAPSHOT=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_STATESYNC=$(grep -oE '^UPDATE_STATESYNC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_LIVE_PEERS=$(grep -oE '^UPDATE_LIVE_PEERS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_CLI_CHEATSHEET=$(grep -oE '^UPDATE_CLI_CHEATSHEET=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
}

function enrichBlockchainConfig {
  # Temporary variables to store current values
  local current_chain_id="${CHAIN_ID}"
  local current_version="${VERSION}"

  echo "Initial CHAIN_ID: ${CHAIN_ID}"
  echo "Initial VERSION: ${VERSION}"

  # Enrich chain id
  if [ "${CHAIN_ID}" == "auto" ]; then
    new_chain_id=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.network')
    echo "Fetched new_chain_id: ${new_chain_id}"
    if [[ -n "${new_chain_id}" && "${new_chain_id}" != "auto" ]]; then
      CHAIN_ID="${new_chain_id}"
    else
      CHAIN_ID="${current_chain_id}"
    fi
  fi

  echo "Updated CHAIN_ID: ${CHAIN_ID}"

  # Enrich endpoint peer
  if [ "${ENDPOINT_PEER}" == "auto" ]; then
    peer_id=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.default_node_id')
    peer_address=$(echo ${ENDPOINT_RPC} | sed -e "s/https\:\/\///")
    peer_addr=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.listen_addr' | sed -e 's/.*://')
    ENDPOINT_PEER="${peer_id}@${peer_address}:${peer_addr}"
  fi

  echo "Updated ENDPOINT_PEER: ${ENDPOINT_PEER}"

  # Enrich binary version
  if [ "${VERSION}" == "auto" ]; then
    new_version=$(curl -s "${ENDPOINT_RPC}/abci_info?" | jq -r '.result.response.version' | tr -d '"')
    echo "Fetched new_version: ${new_version}"
    if [[ -n "${new_version}" && "${new_version}" != "null" && "${new_version}" != "auto" ]]; then
      VERSION="${new_version}"
    elif [ -n "${VERSION_HAND}" ]; then
      VERSION="${VERSION_HAND}"
    else
      VERSION="${current_version}"
    fi
  fi

  # Ensure the version starts with "v"
  if [[ ! ${VERSION} == v* && ${VERSION} =~ ^[0-9]+(\.[0-9]+)*$ ]]; then
    VERSION="v${VERSION}"
  fi

  echo "Updated VERSION: ${VERSION}"

  # Enrich github
  if [ "${GITHUB_FOLDER_NAME}" == "auto" ]; then
    GITHUB_FOLDER_NAME=$(echo "${SOCIAL_GITHUB##*/}")
  fi

  echo "Updated GITHUB_FOLDER_NAME: ${GITHUB_FOLDER_NAME}"
}


function escapeSpecialChars {
  echo "$1" | sed 's/[&/\]/\\&/g' | sed 's|#|\\#|g'
}

function replacePageVariables {

  # Blockchain
  sed -i'' "s|\[CHAIN_NAME\]|${CHAIN_NAME}|g" $1
  sed -i'' "s|\[CHAIN_SYSTEM_NAME\]|${CHAIN_SYSTEM_NAME}|g" $1
  sed -i'' "s|\[CHAIN_ID\]|${CHAIN_ID}|g" $1
  perl -i -0pe "s|\[CHAIN_DESCRIPTION\].*?\[CHAIN_DESCRIPTION_END\]|${CHAIN_DESCRIPTION}|s" "$1"
  sed -i'' "s|\[CHAIN_DENOM\]|${CHAIN_DENOM}|g" $1
  sed -i'' "s|\[CHAIN_FEES\]|${CHAIN_FEES}|g" $1

  # Binary
  sed -i'' "s|\[DAEMON_NAME\]|${DAEMON_NAME}|g" $1
  sed -i'' "s|\[VERSION\]|${VERSION}|g" $1
  sed -i'' "s|\[DAEMON_SERVICE\]|${DAEMON_SERVICE}|g" $1
  sed -i'' "s|\[DAEMON_HOME\]|${DAEMON_HOME}|g" $1

  # Endpoints
  sed -i'' "s|\[ENDPOINT_RPC\]|${ENDPOINT_RPC}|g" $1
  sed -i'' "s|\[ENDPOINT_API\]|${ENDPOINT_API}|g" $1
  sed -i'' "s|\[ENDPOINT_JRPC\]|${ENDPOINT_JRPC}|g" $1
  sed -i'' "s|\[ENDPOINT_GRPC\]|${ENDPOINT_GRPC}|g" $1
  sed -i'' "s|\[ENDPOINT_PEER\]|${ENDPOINT_PEER}|g" $1
  sed -i'' "s|\[ENDPOINT_COSMOSLIST\]|${ENDPOINT_COSMOSLIST}|g" $1

  sed -i'' "s|\[ENDPOINT_RPC_BLOCK\]|${ENDPOINT_RPC_BLOCK}|g" $1
  sed -i'' "s|\[ENDPOINT_API_BLOCK\]|${ENDPOINT_API_BLOCK}|g" $1
  sed -i'' "s|\[ENDPOINT_JRPC_BLOCK\]|${ENDPOINT_JRPC_BLOCK}|g" $1
  sed -i'' "s|\[ENDPOINT_GRPC_BLOCK\]|${ENDPOINT_GRPC_BLOCK}|g" $1
  sed -i'' "s|\[ENDPOINT_COSMOSLIST_BLOCK\]|${ENDPOINT_COSMOSLIST_BLOCK}|g" $1

  # Social
  sed -i'' "s|\[SOCIAL_WEBSITE\]|${SOCIAL_WEBSITE}|g" $1
  sed -i'' "s|\[SOCIAL_GITHUB\]|${SOCIAL_GITHUB}|g" $1
  sed -i'' "s|\[SOCIAL_DISCORD\]|${SOCIAL_DISCORD}|g" $1
  sed -i'' "s|\[SOCIAL_X\]|${SOCIAL_X}|g" $1
  sed -i'' "s|\[SOCIAL_TELEGRAM\]|${SOCIAL_TELEGRAM}|g" $1

  sed -i'' "s|\[SOCIAL_WEBSITE_BLOCK\]|${SOCIAL_WEBSITE_BLOCK}|g" $1
  sed -i'' "s|\[SOCIAL_GITHUB_BLOCK\]|${SOCIAL_GITHUB_BLOCK}|g" $1
  sed -i'' "s|\[SOCIAL_DISCORD_BLOCK\]|${SOCIAL_DISCORD_BLOCK}|g" $1
  sed -i'' "s|\[SOCIAL_X_BLOCK\]|${SOCIAL_X_BLOCK}|g" $1
  sed -i'' "s|\[SOCIAL_TELEGRAM_BLOCK\]|${SOCIAL_TELEGRAM_BLOCK}|g" $1

  # Other
  sed -i'' "s|\[DOWNLOAD_URL\]|${DOWNLOAD_URL}|g" $1
  sed -i'' "s|\[GITHUB_FOLDER_NAME\]|${GITHUB_FOLDER_NAME}|g" $1
  sed -i'' "s|\[LIVE_PEERS_COUNT\]|${LIVE_PEERS_COUNT}|g" $1
  sed -i'' "s|\[LIVE_PEERS_ALL\]|${LIVE_PEERS_ALL}|g" $1
  sed -i'' "s|\[TIMESTAMP\]|${TIMESTAMP}|g" $1
  sed -i'' "s|\[SIZE\]|${SIZE}|g" $1
  sed -i'' "s|\[SNAP_LATEST_BLOCK\]|${SNAP_LATEST_BLOCK}|g" $1
  sed -i'' "s|\[SNAP_ARCHIVE_NAME\]|${SNAP_ARCHIVE_NAME}|g" $1
  sed -i'' "s|\[SNAP_ARCHIVE_LINK\]|${SNAP_ARCHIVE_LINK}|g" $1
  escaped_command=$(echo "${SNAP_ARCHIVE_DOWNLOAD_COMMAND}" | sed 's/[\/&]/\\&/g')
  sed -i'' "s|\[SNAP_ARCHIVE_DOWNLOAD_COMMAND\]|${escaped_command}|g" $1
  sed -i'' "s|\[LIVE_PEERS_RANDOM\]|${LIVE_PEERS_RANDOM}|g" $1
  sed -i'' "s|\[VALIDATOR_LINK\]|${VALIDATOR_LINK}|g" $1
  sed -i'' "s|\[VERSION_HAND\]|${VERSION_HAND}|g" $1
}

#####################################################################################################################################################################
#                                                                          UPDATE MAINNET PAGES                                                                     #
#####################################################################################################################################################################

function updateMain {
  if [ "$UPDATE_MAIN" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}.md"
    cp "../docs/mainnet-networks/template.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    # Endpoints
    if [ -n "${ENDPOINT_RPC}" ] ; then
      ENDPOINT_RPC_BLOCK="<SmallCard to=\"${ENDPOINT_RPC}\" header={{label: \"RPC Endpoint\", translateId: \"rpc-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_API}" ] ; then
      ENDPOINT_API_BLOCK="<SmallCard to=\"${ENDPOINT_API}\" header={{label: \"API Endpoint\", translateId: \"api-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_JRPC}" ] ; then
      ENDPOINT_JRPC_BLOCK="<SmallCard to=\"${ENDPOINT_JRPC}\" header={{label: \"json-RPC Endpoint\", translateId: \"jrpc-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_GRPC}" ] ; then
      ENDPOINT_GRPC_BLOCK="<SmallCard to=\"${ENDPOINT_GRPC}\" header={{label: \"gRPC Endpoint\", translateId: \"grpc-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_COSMOSLIST}" ] ; then
      ENDPOINT_COSMOSLIST_BLOCK="<SmallCard to=\"${ENDPOINT_COSMOSLIST}\" header={{label: \"Cosmoslist Endpoint\", translateId: \"cosmoslist-endpoint\"}}/>"
    fi

    # Social

    if [ -n "${SOCIAL_WEBSITE}" ] ; then
      SOCIAL_WEBSITE_BLOCK="<SmallCard to=\"${SOCIAL_WEBSITE}\" header={{label: \"Website\", translateId: \"social-telegram\"}} iconPath=\"img/website-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_GITHUB}" ] ; then
      SOCIAL_GITHUB_BLOCK="<SmallCard to=\"${SOCIAL_GITHUB}\" header={{label: \"GitHub\", translateId: \"social-telegram\"}} iconPath=\"img/github-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_DISCORD}" ] ; then
      SOCIAL_DISCORD_BLOCK="<SmallCard to=\"${SOCIAL_DISCORD}\" header={{label: \"Discord\", translateId: \"social-telegram\"}} iconPath=\"img/discord-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_X}" ] ; then
      SOCIAL_X_BLOCK="<SmallCard to=\"${SOCIAL_X}\" header={{label: \"X\", translateId: \"social-telegram\"}} iconPath=\"img/x-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_TELEGRAM}" ] ; then
      SOCIAL_TELEGRAM_BLOCK="<SmallCard to=\"${SOCIAL_TELEGRAM}\" header={{label: \"Telegram\", translateId: \"social-telegram\"}} iconPath=\"img/telegram-icon.svg\"/>"
    fi

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateCategory {
  if [ "$UPDATE_CATEGORY" = true ] ; then
    mkdir -p "../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}"
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/_category_.json"
    cp "../docs/mainnet-networks/template/_category_.json" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateInstall {
  if [ "$UPDATE_INSTALL" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/install.md"
    cp "../docs/mainnet-networks/template/install.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateUpgrade {
  if [ "$UPDATE_UPGRADE" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/upgrade.md"
    cp "../docs/mainnet-networks/template/upgrade.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshot {
  if [ "$UPDATE_SNAPSHOT" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.md"
    cp "../docs/mainnet-networks/template/snapshot.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateStatesync {
  if [ "$UPDATE_STATESYNC" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/statesync.md"
    cp "../docs/mainnet-networks/template/statesync.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateLivePeers {
  if [ "$UPDATE_LIVE_PEERS" = true ]; then
    # Gathering live peers using the new command
    LIVE_PEERS_RAW=$(curl -sS "${ENDPOINT_RPC}:443/net_info" | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}')

    # Variables
    LIVE_PEERS_COUNT=$(echo "${LIVE_PEERS_RAW}" | wc -l)
    LIVE_PEERS_ALL=$(echo "${LIVE_PEERS_RAW}" | paste -sd "," -)
    LIVE_PEERS_RANDOM=$(echo "${LIVE_PEERS_RAW}" | sort --random-sort | head -n 5 | paste -sd "," -)

    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"
    cp "../docs/mainnet-networks/template/live-peers.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshotInfo {
  # Get the actual filename from the directory listing
  local filename
  filename=$(curl -s "https://snapshots.noders.services/${CHAIN_SYSTEM_NAME}/" | grep -o "\"${CHAIN_SYSTEM_NAME}.*.tar.lz4\"" | cut -d "\"" -f2)
  local url="https://snapshots.noders.services/${CHAIN_SYSTEM_NAME}/${filename}"

  # Fetching the headers for the snapshot URL
  local headers
  headers=$(curl -sI "${url}")

  # Extracting TIMESTAMP
  local timestamp
  timestamp=$(echo "${headers}" | grep -i '^Last-Modified:' | cut -d' ' -f2- | tr -d '\r')

  # Extracting SIZE and converting it to GB
  local size_raw
  size_raw=$(echo "${headers}" | awk 'BEGIN { FS=": " } tolower($1) == "content-length" { print $2 }')
  local size_gb
  size_gb=$(awk "BEGIN {printf \"%.2f\", ${size_raw}/(1024*1024*1024)}")

  # Assigning the extracted values to the global variables
  if [ -z "${timestamp}" ]; then
    TIMESTAMP="-"
  else
    TIMESTAMP="${timestamp}"
  fi

  if [ -z "${size_gb}" ]; then
    SIZE="-"
  else
    SIZE="${size_gb} GB"
  fi

  if [ -z "${filename}" ]; then
    SNAP_LATEST_BLOCK="-"
    SNAP_ARCHIVE_NAME="${CHAIN_SYSTEM_NAME}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="Snapshot is not available"
  else
    SNAP_LATEST_BLOCK="$(echo "${filename}" | grep -o "[[:digit:]]*" | head -n 1)"
    SNAP_ARCHIVE_NAME="${filename}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="curl -o - -L ${url} | lz4 -d | tar -x -C ${DAEMON_HOME}"
  fi

  SNAP_ARCHIVE_LINK="${url}"

  CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.md"
  cp "../docs/mainnet-networks/template/snapshot.md" "${CHAIN_PAGE_PATH}"
  echo "${CHAIN_PAGE_PATH}"

  replacePageVariables "${CHAIN_PAGE_PATH}"
}

function updateCLICheatsheet {
  if [ "$UPDATE_CLI_CHEATSHEET" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/cli-cheatsheet.md"
    cp "../docs/mainnet-networks/template/cli-cheatsheet.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

#####################################################################################################################################################################
#                                                                              INSTALL MAINNET                                                                      #
#####################################################################################################################################################################
for config_file in "mainnet-networks"/*
do
  echo "${config_file}"
  readBlockchainConfig "${config_file}"
  enrichBlockchainConfig

  updateMain
  updateCategory
  updateInstall
  updateUpgrade
  updateSnapshot
  updateStatesync
  updateSnapshotInfo
  updateLivePeers
  updateCLICheatsheet

  #echo ${LIVE_PEERS_RANDOM}
done

#####################################################################################################################################################################
#                                                                          UPDATE TESTNET PAGES                                                                             #
#####################################################################################################################################################################

function updateMain {
  if [ "$UPDATE_MAIN" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}.md"
    cp "../docs/testnet-networks/template.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    # Endpoints
    if [ -n "${ENDPOINT_RPC}" ] ; then
      ENDPOINT_RPC_BLOCK="<SmallCard to=\"${ENDPOINT_RPC}\" header={{label: \"RPC Endpoint\", translateId: \"rpc-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_API}" ] ; then
      ENDPOINT_API_BLOCK="<SmallCard to=\"${ENDPOINT_API}\" header={{label: \"API Endpoint\", translateId: \"api-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_JRPC}" ] ; then
      ENDPOINT_JRPC_BLOCK="<SmallCard to=\"${ENDPOINT_JRPC}\" header={{label: \"json-RPC Endpoint\", translateId: \"jrpc-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_GRPC}" ] ; then
      ENDPOINT_GRPC_BLOCK="<SmallCard to=\"${ENDPOINT_GRPC}\" header={{label: \"gRPC Endpoint\", translateId: \"grpc-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_COSMOSLIST}" ] ; then
      ENDPOINT_COSMOSLIST_BLOCK="<SmallCard to=\"${ENDPOINT_COSMOSLIST}\" header={{label: \"Cosmoslist Endpoint\", translateId: \"cosmoslist-endpoint\"}}/>"
    fi

    # Social

    if [ -n "${SOCIAL_WEBSITE}" ] ; then
      SOCIAL_WEBSITE_BLOCK="<SmallCard to=\"${SOCIAL_WEBSITE}\" header={{label: \"Website\", translateId: \"social-telegram\"}} iconPath=\"img/website-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_GITHUB}" ] ; then
      SOCIAL_GITHUB_BLOCK="<SmallCard to=\"${SOCIAL_GITHUB}\" header={{label: \"GitHub\", translateId: \"social-telegram\"}} iconPath=\"img/github-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_DISCORD}" ] ; then
      SOCIAL_DISCORD_BLOCK="<SmallCard to=\"${SOCIAL_DISCORD}\" header={{label: \"Discord\", translateId: \"social-telegram\"}} iconPath=\"img/discord-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_X}" ] ; then
      SOCIAL_X_BLOCK="<SmallCard to=\"${SOCIAL_X}\" header={{label: \"X\", translateId: \"social-telegram\"}} iconPath=\"img/x-icon.svg\"/>"
    fi
    if [ -n "${SOCIAL_TELEGRAM}" ] ; then
      SOCIAL_TELEGRAM_BLOCK="<SmallCard to=\"${SOCIAL_TELEGRAM}\" header={{label: \"Telegram\", translateId: \"social-telegram\"}} iconPath=\"img/telegram-icon.svg\"/>"
    fi

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateCategory {
  if [ "$UPDATE_CATEGORY" = true ] ; then
    mkdir -p "../docs/testnet-networks/${CHAIN_SYSTEM_NAME}"
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/_category_.json"
    cp "../docs/testnet-networks/template/_category_.json" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateInstall {
  if [ "$UPDATE_INSTALL" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/install.md"
    cp "../docs/testnet-networks/template/install.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateUpgrade {
  if [ "$UPDATE_UPGRADE" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/upgrade.md"
    cp "../docs/testnet-networks/template/upgrade.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshot {
  if [ "$UPDATE_SNAPSHOT" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.md"
    cp "../docs/testnet-networks/template/snapshot.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateStatesync {
  if [ "$UPDATE_STATESYNC" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/statesync.md"
    cp "../docs/testnet-networks/template/statesync.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateLivePeers {
  if [ "$UPDATE_LIVE_PEERS" = true ]; then
    # Gathering live peers using the new command
    LIVE_PEERS_RAW=$(curl -sS "${ENDPOINT_RPC}:443/net_info" | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}')

    # Variables
    LIVE_PEERS_COUNT=$(echo "${LIVE_PEERS_RAW}" | wc -l)
    LIVE_PEERS_ALL=$(echo "${LIVE_PEERS_RAW}" | paste -sd "," -)
    LIVE_PEERS_RANDOM=$(echo "${LIVE_PEERS_RAW}" | sort --random-sort | head -n 5 | paste -sd "," -)

    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"
    cp "../docs/testnet-networks/template/live-peers.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshotInfo {
  # Get the actual filename from the directory listing
  local filename
  filename=$(curl -s "https://snapshots-t.noders.services/${CHAIN_SYSTEM_NAME}/" | grep -o "\"${CHAIN_SYSTEM_NAME}.*.tar.lz4\"" | cut -d "\"" -f2)
  local url="https://snapshots-t.noders.services/${CHAIN_SYSTEM_NAME}/${filename}"

  # Fetching the headers for the snapshot URL
  local headers
  headers=$(curl -sI "${url}")

  # Extracting TIMESTAMP
  local timestamp
  timestamp=$(echo "${headers}" | grep -i '^Last-Modified:' | cut -d' ' -f2- | tr -d '\r')

  # Extracting SIZE and converting it to GB
  local size_raw
  size_raw=$(echo "${headers}" | awk 'BEGIN { FS=": " } tolower($1) == "content-length" { print $2 }')
  local size_gb
  size_gb=$(awk "BEGIN {printf \"%.2f\", ${size_raw}/(1024*1024*1024)}")

  # Assigning the extracted values to the global variables
  if [ -z "${timestamp}" ]; then
    TIMESTAMP="-"
  else
    TIMESTAMP="${timestamp}"
  fi

  if [ -z "${size_gb}" ]; then
    SIZE="-"
  else
    SIZE="${size_gb} GB"
  fi

  if [ -z "${filename}" ]; then
    SNAP_LATEST_BLOCK="-"
    SNAP_ARCHIVE_NAME="${CHAIN_SYSTEM_NAME}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="Snapshot is not available"
  else
    SNAP_LATEST_BLOCK="$(echo "${filename}" | grep -o "[[:digit:]]*" | head -n 1)"
    SNAP_ARCHIVE_NAME="${filename}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="curl -o - -L ${url} | lz4 -d | tar -x -C ${DAEMON_HOME}"
  fi

  SNAP_ARCHIVE_LINK="${url}"

  CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.md"
  cp "../docs/testnet-networks/template/snapshot.md" "${CHAIN_PAGE_PATH}"
  echo "${CHAIN_PAGE_PATH}"

  replacePageVariables "${CHAIN_PAGE_PATH}"
}

function updateCLICheatsheet {
  if [ "$UPDATE_CLI_CHEATSHEET" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/cli-cheatsheet.md"
    cp "../docs/testnet-networks/template/cli-cheatsheet.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

#####################################################################################################################################################################
#                                                                              INSTALL TESTNET                                                                      #
#####################################################################################################################################################################

for config_file in "testnet-networks"/*
do
  echo "${config_file}"
  readBlockchainConfig "${config_file}"
  enrichBlockchainConfig

  updateMain
  updateCategory
  updateInstall
  updateUpgrade
  updateSnapshot
  updateStatesync
  updateSnapshotInfo
  updateLivePeers
  updateCLICheatsheet

  #echo ${LIVE_PEERS_RANDOM}
done