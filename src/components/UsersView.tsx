import { Alert, ChakraModal } from 'bloben-components';
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
import { ROLE } from 'bloben-interface/enums';
import AdminUsersApi from '../api/adminUsers.api';
import Password from './userEdit/Password';
import React, { useState } from 'react';
import Username from './userEdit/Username';

const renderUsers = (
  users: GetUsersResponse[],
  handleEnabledStatusChange: any,
  handleEmailsAllowedChange: any,
  handleChangeRole: any,
  deleteUser: any,
  renameUser: any,
  changeUserPassword: any
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
              <MenuButton as={Button} disabled={user.role === ROLE.ADMIN}>
                {user.role}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleChangeRole(user, ROLE.DEMO)}>
                  {ROLE.DEMO}
                </MenuItem>
                <MenuItem onClick={() => handleChangeRole(user, ROLE.USER)}>
                  {ROLE.USER}
                </MenuItem>
              </MenuList>
            </Menu>
          </Td>
          <Td>
            <Checkbox
              onChange={() => handleEnabledStatusChange(user)}
              isChecked={user.isEnabled}
              disabled={user.role === ROLE.ADMIN}
            />
            {user.isEnabled}
          </Td>
          <Td>
            <Checkbox
              onChange={() => handleEmailsAllowedChange(user)}
              isChecked={user.emailsAllowed}
              disabled={user.role === ROLE.ADMIN || user.role === ROLE.DEMO}
            />
            {user.emailsAllowed}
          </Td>
          <Td>
            <Menu>
              <MenuButton as={Button} disabled={user.role === ROLE.ADMIN}>
                More
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => renameUser(user)}>Rename</MenuItem>
                <MenuItem
                  onClick={() => changeUserPassword(user)}
                  disabled={user.role === ROLE.ADMIN}
                >
                  Change password
                </MenuItem>
                <MenuItem
                  onClick={() => deleteUser(user)}
                  disabled={user.role === ROLE.ADMIN}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
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

  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const [selectedUser, selectUser] = useState<null | GetUsersResponse>(null);
  const {
    users,
    handleEnabledStatusChange,
    handleEmailsAllowedChange,
    handleChangeRole,
    getUsers,
  } = props;

  const renameUser = (user: GetUsersResponse) => {
    selectUser(user);
    setRenameModalVisible(true);
  };

  const changeUserPassword = (user: GetUsersResponse) => {
    selectUser(user);
    setPasswordModalVisible(true);
  };

  const renderedUsers: any = renderUsers(
    users,
    handleEnabledStatusChange,
    handleEmailsAllowedChange,
    handleChangeRole,
    selectUser,
    renameUser,
    changeUserPassword
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

      {selectedUser && renameModalVisible ? (
        <ChakraModal
          isOpen={renameModalVisible}
          handleClose={() => {
            handleClose();
            setRenameModalVisible(false);
          }}
          title={'Rename user'}
        >
          <Username
            user={selectedUser}
            getUsers={getUsers}
            handleClose={() => {
              handleClose();
              setRenameModalVisible(false);
            }}
          />
        </ChakraModal>
      ) : null}

      {selectedUser && passwordModalVisible ? (
        <ChakraModal
          isOpen={passwordModalVisible}
          handleClose={() => {
            handleClose();
            setPasswordModalVisible(false);
          }}
          title={"Change user's password"}
        >
          <Password
            user={selectedUser}
            getUsers={getUsers}
            handleClose={() => {
              handleClose();
              setPasswordModalVisible(false);
            }}
          />
        </ChakraModal>
      ) : null}
    </Table>
  );
};

export default UsersView;
