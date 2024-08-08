import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'admin@example.com' && password === 'password') {
      alert('Login bem-sucedido!');
    } else {
      setError('Usuário não encontrado.');
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={4} align="stretch">
          <Heading mb={6} textAlign="center">
            Login
          </Heading>

          {error && (
            <Alert status="error" borderRadius={8}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </FormControl>

          <Button
            colorScheme="teal"
            onClick={handleLogin}
            mt={4}
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
