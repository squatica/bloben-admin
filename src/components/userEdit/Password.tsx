import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { GetUsersResponse } from 'bloben-interface';
import { PrimaryButton, Separator } from 'bloben-components';
import AdminUsersApi from '../../api/adminUsers.api';
import React, { useState } from 'react';

interface PasswordProps {
  user: GetUsersResponse;
  handleClose: any;
  getUsers: any;
}
const Password = (props: PasswordProps) => {
  const { user, getUsers, handleClose } = props;
  const toast = useToast();

  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onChange = (e: any) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      await AdminUsersApi.updateUser(user.id, {
        password,
      });

      handleClose();
      getUsers();
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast({
          title: e.response?.data?.message,
          status: 'error',
        });
      }
    }
  };

  return (
    <>
      <FormControl id="password" size="2xl">
        <FormLabel size="2xl">Password</FormLabel>
        <InputGroup size={'lg'}>
          <Input
            size="lg"
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
      <Separator height={20} />
      <Center>
        <PrimaryButton
          size={'md'}
          onClick={handleSubmit}
          disabled={password.length < 4}
        >
          Confirm
        </PrimaryButton>
      </Center>
    </>
  );
};

export default Password;
