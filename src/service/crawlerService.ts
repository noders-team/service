import { PublicEndpoint } from '@/types/PublicEndpoint';

const PUBLIC_ENDPOINTS_URL = 'https://rpc-crawler.noders.services';

class CrawlerService {
  async getPublicEndpointsByChainId(chainId: string): Promise<PublicEndpoint[]> {
    const response = await fetch(`${PUBLIC_ENDPOINTS_URL}/api/v1/endpoints/${chainId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch public endpoints');
    }
    const data = await response.json();
    return data.data;
  }

  async getEndpointInfo(rpcUrl: string): Promise<PublicEndpoint> {
    const response = await fetch(`${rpcUrl}/status`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch endpoint info [${rpcUrl}]`);
    }
    const data = await response.json();

    const endpointInfo: PublicEndpoint = {
      chain_id: data.result.node_info.network,
      earliest_block: data.result.sync_info.earliest_block_height,
      latest_block: data.result.sync_info.latest_block_height,
      tx_index_enabled: data.result.node_info.other.tx_index === 'on',
      archive: data.result.sync_info.latest_block_height === 1,
      moniker: data.result.node_info.moniker,
      validator: false,
      flag: {
        emoji: '🇩🇪',
        emoji_unicode: '🇩🇪',
        img: 'https://cdn.ipwhois.io/flags/de.svg',
      },
      id: 0,
      ip: '',
      rpc_port: 0,
      rest_port: 0,
      grpc_port: 0,
      jsonrpc_port: 0,
      status: '',
      created_at: '',
      updated_at: '',
    };

    return endpointInfo;
  }
}

export default new CrawlerService();
