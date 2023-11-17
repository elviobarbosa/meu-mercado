"use client"
import React, { useState, useCallback, useEffect } from 'react';
import BarcodeScanner from '../../components/BarcodeScanner';
import { fetchData, barCodeAPI } from '../../utils/fetch';

const ScanPage = () => {
  const [qrCode, setQrCode] = useState('');
  const [barCodeApiData, setBarCodeApiData] = useState(null);
  
  // useEffect(() => {
  //   const fetchDataAndSetState = async () => {
  //     try {
  //       const data = await fetchData(barCodeAPI('7898943569929'));
  //       setBarCodeApiData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchDataAndSetState();
  // }, []);

  const handleScan = useCallback(async (qrCodeMessage: any) => {
    console.log('Código de barras lido:', qrCodeMessage);
    if (qrCodeMessage !== qrCode) {
      setQrCode(qrCodeMessage);
      console.log(`https://api.cosmos.bluesoft.com.br/gtins/${qrCodeMessage}.json`)

      try {
        const data = await fetchData(barCodeAPI(qrCodeMessage));
        setBarCodeApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    }
    
    
   
  }, [qrCode]);

  return (
    <div>
      <h1>Leitor de Código de Barras</h1>
      <BarcodeScanner onScan={handleScan} />
      CÓDIGO LIDO: {qrCode}<br/>
      <pre>{JSON.stringify(barCodeApiData, null, 2)}</pre>
    </div>
  );
};

export default ScanPage;
