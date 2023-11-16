"use client"
import React, { useState, useCallback } from 'react';
import BarcodeScanner from '../../components/BarcodeScanner'

const ScanPage = () => {
  const [qrCode, setQrCode] = useState('');

  const handleScan = useCallback((qrCodeMessage: any) => {
    console.log('Código de barras lido:', qrCodeMessage);
    setQrCode(qrCodeMessage);
    // Faça o que quiser com o código de barras lido, como enviar para o servidor, etc.
  }, []);

  return (
    <div>
      <h1>Leitor de Código de Barras</h1>
      <BarcodeScanner onScan={handleScan} />
      CÓDIGO LIDO: {qrCode}
    </div>
  );
};

export default ScanPage;
