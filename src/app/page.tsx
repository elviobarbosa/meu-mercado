"use client"
import React, { useState, useCallback } from 'react';
import BarcodeScanner from '../../components/BarcodeScanner'

const ScanPage = () => {
  const [qrCode, setQrCode] = useState('');
  const [apiData, setApiData] = useState(null);
  const apiUrl = 'https://api.cosmos.bluesoft.com.br/gtins/7891910000197.json';

  

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
