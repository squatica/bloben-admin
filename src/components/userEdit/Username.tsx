import {
  Center,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { GetUsersResponse } from 'bloben-interface';
import { PrimaryButton, Separator } from 'bloben-components';
import AdminUsersApi from '../../api/adminUsers.api';
import React, { useEffect, useState } from 'react';

interface UsernameProps {
  user: GetUsersResponse;
  handleClose: any;
  getUsers: any;
}
const Username = (props: UsernameProps) => {
  const { user, getUsers, handleClose } = props;
  const toast = useToast();

  const [username, setUsername] = useState('');

  const onChange = (e: any) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
  };

  useEffect(() => {
    setUsername(user.username);
  }, []);

  const handleSubmit = async () => {
    try {
      await AdminUsersApi.updateUser(user.id, {
        username,
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
      <Center>
        <PrimaryButton
          size={'md'}
          onClick={handleSubmit}
          disabled={username.length < 4}
        >
          Confirm
        </PrimaryButton>
      </Center>
    </>
  );
};

export default Username;
