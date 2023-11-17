type CURL = {
  url: string,
  headers?: any
}

export const fetchData = async (cURL: CURL) => {
    try {
      const response = await fetch(cURL.url, {
        method: 'GET',
        headers: cURL.headers,
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Erro na chamada à API:', error.message);
      return {success:false, error: error.message }
    }
};

export function barCodeAPI(barCode: string): CURL {
    return {
      url: `https://api.cosmos.bluesoft.com.br/gtins/${barCode}.json`,
      headers:  {
        'User-Agent': 'Cosmos-API-Request',
        'Content-Type': 'application/json',
        'X-Cosmos-Token': 'ZdS7Nmw4HAm15X2X_BT2lA',
      },
    }
}