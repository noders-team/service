import { Chain } from '@/types/Chain';

class ChainService {
  private async fetchChains(url: string): Promise<Chain[]> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch chains data');
    }
    return response.json();
  }

  async getChains(url: string): Promise<Chain[]> {
    return this.fetchChains(url);
  }

  async getMainnetChains(url: string): Promise<Chain[]> {
    const chains = await this.fetchChains(url);
    return chains.filter((chain: Chain) => chain.scope === 'mainnet');
  }

  async getTestnetChains(url: string): Promise<Chain[]> {
    const chains = await this.fetchChains(url);
    return chains.filter((chain: Chain) => chain.scope === 'testnet');
  }
}

export default new ChainService();
