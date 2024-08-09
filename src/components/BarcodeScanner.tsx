
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';


const BarcodeScanner = ({ onScan }: { onScan: (code: string) => void }) => {
  function onScanFailure<T>(error: T) {
    console.warn(`Código não encontrado ${error}`)
  }

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      'qr-code-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
  
    qrCodeScanner.render(onScan, onScanFailure);
  
    return () => {
      qrCodeScanner.clear();
    };
  }, [onScan]);

  return (
    <>
    <Card>
      <CardHeader>
        <Heading size='md'>Leitor de código de barras</Heading>
      </CardHeader>

      

      <CardBody>
      <div id="qr-code-reader">
        {/* O conteúdo do leitor de código de barras será renderizado aqui */}
      </div>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Summary
            </Heading>
            <Text>
              View a summary of all your clients over the last month.
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Overview
            </Heading>
            <Text pt='2' fontSize='sm'>
              Check out the overview of your clients.
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Analysis
            </Heading>
            <Text pt='2' fontSize='sm'>
              See a detailed analysis of all your business clients.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
    
    </>
  );
};

export default BarcodeScanner;
