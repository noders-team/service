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
}

export default new CrawlerService();
