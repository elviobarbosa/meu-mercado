
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const BarcodeScanner = ({ onScan }) => {
  function onScanFailure(error) {
   // console.warn(`Código não encontrado`)
  }
  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      'qr-code-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    qrCodeScanner.render(onScan, onScanFailure);

    return () => qrCodeScanner.clear();
  }, [onScan]);

  return (
    <div id="qr-code-reader">
      {/* O conteúdo do leitor de código de barras será renderizado aqui */}
    </div>
  );
};

export default BarcodeScanner;
