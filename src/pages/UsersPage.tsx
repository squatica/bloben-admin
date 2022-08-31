import { AxiosResponse } from 'axios';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { GetUsersResponse } from '../bloben-interface/admin/admin';
import { ROLE } from '../bloben-interface/enums';
import AdminUsersApi from '../api/adminUsers.api';
import React, { useEffect, useState } from 'react';
import Separator from '../components/Separator';
import UsersView from '../components/UsersView';

const UsersPage = () => {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<GetUsersResponse[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const getUsers = async (): Promise<void> => {
    try {
      const response: AxiosResponse<GetUsersResponse[]> =
        await AdminUsersApi.getUsers();

      if (response.data) {
        setUsers(response.data);
      }
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast({
          title: e.response?.data?.message,
          status: 'error',
        });
      }
    }
  };

  const handleEnabledStatusChange = async (user: GetUsersResponse) => {
    await AdminUsersApi.updateUser(user.id, {
      isEnabled: !user.isEnabled,
      emailsAllowed: user.emailsAllowed,
    });
    await getUsers();
  };

  const handleEmailsAllowedChange = async (user: GetUsersResponse) => {
    await AdminUsersApi.updateUser(user.id, {
      isEnabled: user.isEnabled,
      emailsAllowed: !user.emailsAllowed,
    });
    await getUsers();
  };

  const handleChangeRole = async (user: GetUsersResponse, role: ROLE) => {
    await AdminUsersApi.updateUser(user.id, {
      role,
      isEnabled: user.isEnabled,
      emailsAllowed: user.emailsAllowed,
    });
    await getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onChange = (e: any) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleCreate = async (): Promise<void> => {
    try {
      await AdminUsersApi.createUser({
        username,
        password,
      });

      setIsModalOpen(false);
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
      <Separator height={16} />
      <UsersView
        users={users}
        getUsers={getUsers}
        handleEnabledStatusChange={handleEnabledStatusChange}
        handleChangeRole={handleChangeRole}
        handleEmailsAllowedChange={handleEmailsAllowedChange}
      />
      <div style={{ position: 'fixed', bottom: 50, right: 50 }}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => setIsModalOpen(true)}
        >
          Create user
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
          <Separator height={20} />
          <Center>
            <Button onClick={handleCreate}>Confirm</Button>
          </Center>
          <Separator height={20} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default UsersPage;
