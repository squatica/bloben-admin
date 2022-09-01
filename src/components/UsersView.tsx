import { Alert } from 'bloben-components';
import {
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { GetUsersResponse } from 'bloben-interface';
import AdminUsersApi from '../api/adminUsers.api';
import React, { useState } from 'react';

const renderUsers = (
  users: GetUsersResponse[],
  handleEnabledStatusChange: any,
  handleEmailsAllowedChange: any,
  handleChangeRole: any,
  deleteUser: any
) => {
  return users
    ?.sort((a, b) => {
      return a.username.localeCompare(b.username);
    })
    .map((user: GetUsersResponse) => {
      return (
        <Tr key={user.id}>
          <Td>{user.username}</Td>
          <Td>
            <Menu>
              <MenuButton as={Button} disabled={user.role === 'ADMIN'}>
                {user.role}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleChangeRole(user, 'DEMO')}>
                  {'DEMO'}
                </MenuItem>
                <MenuItem onClick={() => handleChangeRole(user, 'USER')}>
                  {'USER'}
                </MenuItem>
              </MenuList>
            </Menu>
          </Td>
          <Td>
            <Checkbox
              onChange={() => handleEnabledStatusChange(user)}
              isChecked={user.isEnabled}
              disabled={user.role === 'ADMIN'}
            />
            {user.isEnabled}
          </Td>
          <Td>
            <Checkbox
              onChange={() => handleEmailsAllowedChange(user)}
              isChecked={user.emailsAllowed}
              disabled={user.role === 'ADMIN' || user.role === 'DEMO'}
            />
            {user.emailsAllowed}
          </Td>
          <Td>
            <Button
              onClick={() => deleteUser(user)}
              disabled={user.role === 'ADMIN'}
              colorScheme={'red'}
            >
              Delete
            </Button>
          </Td>
        </Tr>
      );
    });
};

interface UsersViewProps {
  users: GetUsersResponse[];
  handleEnabledStatusChange: any;
  handleChangeRole: any;
  getUsers: any;
  handleEmailsAllowedChange: any;
}
const UsersView = (props: UsersViewProps) => {
  const toast = useToast();

  const [selectedUser, selectUser] = useState<null | GetUsersResponse>(null);
  const {
    users,
    handleEnabledStatusChange,
    handleEmailsAllowedChange,
    handleChangeRole,
  } = props;

  const renderedUsers: any = renderUsers(
    users,
    handleEnabledStatusChange,
    handleEmailsAllowedChange,
    handleChangeRole,
    selectUser
  );

  const handleClose = () => selectUser(null);

  const handleDelete = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      const response = await AdminUsersApi.deleteUser(selectedUser.id);

      toast({
        title: response?.data?.message,
      });
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast({
          title: e.response?.data?.message,
          status: 'error',
        });
      }
    }

    props.getUsers();

    handleClose();
  };

  // @ts-ignore
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>username</Th>
          <Th>role</Th>
          <Th>is enabled</Th>
          <Th>emails allowed</Th>
        </Tr>
      </Thead>
      <Tbody>{renderedUsers}</Tbody>

      {selectedUser ? (
        <Alert
          isOpen={selectedUser?.username !== undefined}
          onClose={handleClose}
          header={'Delete user'}
          body={`Do you want to delete user ${selectedUser.username}?`}
          onSubmit={handleDelete}
          submitText={'Delete'}
        />
      ) : null}
    </Table>
  );
};

export default UsersView;
