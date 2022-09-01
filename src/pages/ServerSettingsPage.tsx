import { AxiosResponse } from 'axios';
import {
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from '@chakra-ui/react';
import { CommonResponse } from '../data/interface';
import { LOCATION_PROVIDER } from '../enums';
import { Separator, SettingsRow } from 'bloben-components';
import React, { useEffect, useState } from 'react';
import ServerSettingsApi from '../api/serverSettings.api';

const menuStyle: any = {
  width: '100%',
  justifyContent: 'flex-start',
  textAlign: 'left',
};

const ServerSettingsPage = () => {
  const toast = useToast();

  const [serverSettings, setServerSettings] = useState<any>({});
  const [emailCounter, setEmailCounter] = useState<number>(0);

  const getServerSettings = async () => {
    const response = await ServerSettingsApi.get();

    if (response.status === 200) {
      setServerSettings(response.data);
    }
  };

  useEffect(() => {
    setEmailCounter(serverSettings.emailCounter);
  }, [serverSettings.emailCounter]);

  useEffect(() => {
    getServerSettings();
  }, []);

  const handleChangeCheckNewVersion = async () => {
    try {
      const response: AxiosResponse<CommonResponse> =
        await ServerSettingsApi.patch({
          checkNewVersion: !serverSettings.checkNewVersion,
        });

      if (response.status === 200) {
        toast({ title: response.data?.message });

        getServerSettings();
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

  const handleChangeLocationProvider = async (value: LOCATION_PROVIDER) => {
    try {
      const response: AxiosResponse<CommonResponse> =
        await ServerSettingsApi.patch({
          locationProvider: value,
        });

      if (response.status === 200) {
        toast({ title: response.data?.message });

        getServerSettings();
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

  const handleChangeEmailCounter = (value: string) => {
    setEmailCounter(parseInt(value));
  };

  const handleSubmitEmailCounter = async () => {
    if (emailCounter === serverSettings.emailCounter) {
      return;
    }
    try {
      const response: AxiosResponse<CommonResponse> =
        await ServerSettingsApi.patch({
          emailCounter: emailCounter,
        });

      if (response.status === 200) {
        toast({ title: response.data?.message });

        getServerSettings();
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

  return (
    <Flex direction={'column'} padding={24}>
      <Separator height={24} />
      <Flex direction="column">
        <SettingsRow title={'Check updates (bloben.com/version.txt)'}>
          <Checkbox
            isChecked={serverSettings.checkNewVersion}
            onChange={handleChangeCheckNewVersion}
            size={'lg'}
          ></Checkbox>
        </SettingsRow>
      </Flex>
      <Separator height={8} />
      <SettingsRow title={'Email daily limit'}>
        <NumberInput
          style={menuStyle}
          defaultValue={emailCounter}
          value={emailCounter}
          max={500}
          min={0}
          maxWidth={40}
          keepWithinRange={true}
          size={'lg'}
          clampValueOnBlur={false}
          onChange={handleChangeEmailCounter}
          onBlur={handleSubmitEmailCounter}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </SettingsRow>
      <Separator height={8} />
      <SettingsRow title={'Location provider'}>
        <Menu>
          <MenuButton as={Button}>{serverSettings.locationProvider}</MenuButton>
          <MenuList>
            <MenuItem
              onClick={() =>
                handleChangeLocationProvider(LOCATION_PROVIDER.OPEN_STREET_MAPS)
              }
            >
              {LOCATION_PROVIDER.OPEN_STREET_MAPS}
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleChangeLocationProvider(LOCATION_PROVIDER.GOOGLE_MAPS)
              }
            >
              {LOCATION_PROVIDER.GOOGLE_MAPS}
            </MenuItem>
          </MenuList>
        </Menu>
      </SettingsRow>
    </Flex>
  );
};

export default ServerSettingsPage;
