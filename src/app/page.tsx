"use client"
import React, { useState, useCallback } from 'react';
import BarcodeScanner from '../../components/BarcodeScanner'

const ScanPage = () => {
  const [qrCode, setQrCode] = useState('');
  const [apiData, setApiData] = useState(null);
  const apiUrl = 'https://api.cosmos.bluesoft.com.br/gtins/7891910000197.json';

  const fetchData = async (qrCodeStr:any) => {
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

  fetchData('7898943569929')

  const handleScan = useCallback((qrCodeMessage: any) => {
    console.log('Código de barras lido:', qrCodeMessage);
    if (qrCodeMessage !== qrCode) {
      setQrCode(qrCodeMessage);
      console.log(`https://api.cosmos.bluesoft.com.br/gtins/${qrCodeMessage}.json`)
      //fetchData(qrCodeMessage);
      
    }
    
    
    //fetchData();
    // Faça o que quiser com o código de barras lido, como enviar para o servidor, etc.
  }, []);

  return (
    <div>
      <h1>Leitor de Código de Barras</h1>
      <BarcodeScanner onScan={handleScan} />
      CÓDIGO LIDO: {qrCode}<br/>
      {apiData}
    </div>
  );
};

export default ScanPage;
