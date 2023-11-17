export const fetchData = async (url: string) => {
    try {
      const response = await fetch(`https://api.cosmos.bluesoft.com.br/gtins/${qrCodeStr}.json`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Cosmos-API-Request',
          'Content-Type': 'application/json',
          'X-Cosmos-Token': 'ZdS7Nmw4HAm15X2X_BT2lA',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data = await response.json();
      setApiData(data);
    } catch (error: any) {
      console.error('Erro na chamada à API:', error.message);
    }
};

export function barCodeAPI(barCode: string): string {
    return `https://api.cosmos.bluesoft.com.br/gtins/${barCode}.json`;
}