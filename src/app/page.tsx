"use client";
import React, { useEffect, useState } from 'react';
// @ts-ignore
import Quagga from 'quagga';


function BarcodeScanner() {
  const [barcode, setBarcode] = useState(null);
  
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner'), // O elemento HTML onde a câmera será exibida
        },
        decoder: {
          readers: ['ean_reader'], // Pode adicionar outros formatos de código de barras
        },
      },
      (err: any) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data: any) => {
      setBarcode(data.codeResult.code);
      console.log('Código de barras detectado:', data.codeResult.code);
      // Faça o que for necessário com o código de barras detectado
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <><div id="barcode-scanner" className='camera'></div>
    <div>{barcode}</div></>
  
  );
}

export default BarcodeScanner;
