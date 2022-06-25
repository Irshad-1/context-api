import React from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  theme,
  Heading,
  Input,
} from '@chakra-ui/react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { isAuth, toggleIsAuth } = React.useContext(AuthContext);
  const [token, setToken] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginOrLogout = () => {
    if (isAuth) toggleIsAuth();
    else login();
  };

  const login = async () => {
    try {
      const payload = {
        email,
        password,
      };

      let res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await res.json();
      let { token } = data;
      setToken(token);
      toggleIsAuth();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Heading textAlign="center">Reqres Login Context Api</Heading>
      {!isAuth && (
        <Box width="40%" margin="auto" marginTop="50px">
          <Input
            margin="10px"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            margin="10px"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Box>
      )}
      <Box display="flex" justifyContent="center" margin="auto">
        <Button
          onClick={loginOrLogout}
          backgroundColor={isAuth ? 'red' : 'green'}
        >
          {isAuth ? 'Logout' : 'Login'}
        </Button>
      </Box>
      {isAuth && (
        <Heading size="lg" color="orange" textAlign="center">
          User Logged In Access Token : {token}
        </Heading>
      )}
    </ChakraProvider>
  );
}

export default App;
