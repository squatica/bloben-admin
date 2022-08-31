import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { Context } from '../../context/store';
import Admin2FAApi from '../../api/adminTwoFactor.api';
import AdminApi from '../../api/admin.api';
import React, { useContext, useRef, useState } from 'react';
import Separator from '../Separator';
import TwoFactorSetup from './TwoFactorSetup';

const TwoFactorSettings = () => {
  const [store, dispatch] = useContext(Context);
  const toast = useToast();

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { user } = store;

  const [setupOpen, openSetup] = useState(false);
  const [deleteModalVisible, openDeleteModal] = useState(false);

  const handleDisable2FA = async () => {
    try {
      const response = await Admin2FAApi.delete2FA();

      toast({
        title: response?.data?.message,
      });

      openDeleteModal(false);

      const userResponse = await AdminApi.getAdminAccount();

      setContext('user', userResponse.data);
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast({
          title: e.response?.data?.message,
          status: 'error',
        });
      }
    }
  };

  const leastDestructiveRef = useRef(null);

  return (
    <Flex direction={'column'} maxWidth={'50%'}>
      <Heading>Two factor authentication</Heading>
      <Separator height={24} />
      {user?.isTwoFactorEnabled ? (
        <Button
          _focus={{ boxShadow: 'none' }}
          h="1.75rem"
          size="sm"
          onClick={() => openDeleteModal(true)}
        >
          Disable 2FA
        </Button>
      ) : (
        <Button
          _focus={{ boxShadow: 'none' }}
          size="md"
          onClick={() => openSetup(true)}
        >
          Set up 2FA
        </Button>
      )}

      {setupOpen ? (
        <TwoFactorSetup handleClose={() => openSetup(false)} />
      ) : null}

      <AlertDialog
        isOpen={deleteModalVisible}
        onClose={() => openDeleteModal(false)}
        leastDestructiveRef={leastDestructiveRef}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Two factor authentication
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you want to disable two factor authentication?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={leastDestructiveRef}
                _focus={{ boxShadow: 'none' }}
                onClick={() => openDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                _focus={{ boxShadow: 'none' }}
                colorScheme="red"
                onClick={handleDisable2FA}
                ml={3}
              >
                Disable
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default TwoFactorSettings;
