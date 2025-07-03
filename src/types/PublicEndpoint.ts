export interface IPGeoFlag {
  img: string;
  emoji: string;
  emoji_unicode: string;
}

export interface PublicEndpoint {
  id: number;
  chain_id: string;
  moniker: string;
  ip: string;
  rpc_port: number;
  rest_port: number;
  grpc_port: number;
  jsonrpc_port: number;
  earliest_block: number;
  latest_block: number;
  tx_index_enabled: boolean;
  validator: boolean;
  archive: boolean;
  status: string;
  flag: IPGeoFlag;
  created_at: string;
  updated_at: string;
}
