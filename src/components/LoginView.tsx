import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Separator } from 'bloben-components';
import React, { useState } from 'react';

interface LoginViewProps {
  username: string;
  password: string;
  onChange: any;
  handleLogin: any;
}
const LoginView = (props: LoginViewProps) => {
  const { username, password, onChange, handleLogin } = props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Container width={400}>
        <Heading as="h2" size="2xl">
          Admin Login
        </Heading>
        <Separator />
        <FormControl id="username" size="2xl">
          <FormLabel size="2xl">Username</FormLabel>
          <Input
            size="lg"
            name={'username'}
            value={username}
            onChange={onChange}
          />
        </FormControl>
        <Separator height={20} />
        <FormControl id="password" size="2xl">
          <FormLabel size="2xl">Password</FormLabel>
          <InputGroup size={'lg'}>
            <Input
              type={show ? 'text' : 'password'}
              name={'password'}
              value={password}
              onChange={onChange}
            />
            <InputRightElement width="4.5rem">
              <Button
                _focus={{ boxShadow: 'none' }}
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Separator height={40} />
        <Center>
          <Button onClick={handleLogin} colorScheme="teal" size="md">
            Login
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default LoginView;
