import { AxiosResponse } from 'axios';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { Log } from '../data/interface';
import { Separator } from 'bloben-components';
import LogsApi from '../api/logs.api';
import React, { useEffect, useState } from 'react';

const renderTags = (
  tags: string[],
  selectedTags: string[],
  handleClick: any
) => {
  return tags?.map((tag) => {
    const isSelected = selectedTags.includes(tag);

    return (
      <Button
        key={tag}
        size={'xs'}
        colorScheme={isSelected ? 'blue' : 'gray'}
        variant={isSelected ? 'solid' : 'outline'}
        onClick={() => handleClick(tag)}
        marginRight={2}
        paddingRight={2}
        _focus={{ boxShadow: 'none' }}
      >
        {tag}
      </Button>
    );
  });
};

const renderLogTags = (tags?: string[]) => {
  return tags?.map((tag: string) => {
    return (
      <Tag
        size={'xs'}
        key={tag}
        colorScheme="teal"
        marginRight={2}
        variant="subtle"
        borderRadius={'full'}
        paddingLeft={2}
        paddingRight={2}
        paddingTop={1}
        paddingBottom={1}
        fontSize={11}
      >
        {tag}
      </Tag>
    );
  });
};

const renderLogs = (logs: any) => {
  if (!logs || !logs.length) {
    return null;
  }

  return logs.map((log: any) => {
    return (
      <Tr key={`${log.timestamp}_${log.level}`}>
        <Td>{log.timestamp}</Td>
        <Td>{log.level}</Td>
        <Td>{log.message}</Td>
        <Td>{renderLogTags(log.tags)}</Td>
      </Tr>
    );
  });
};

const LogsPage = () => {
  const toast = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, selectTags] = useState<string[]>([]);
  const [logLevel, setLogLevel] = useState<string>('combined');

  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, selectDate] = useState<string>('');
  const [logs, setLogs] = useState<Log[]>([]);

  const getLogTags = async (): Promise<void> => {
    try {
      const response: AxiosResponse<string[]> = await LogsApi.getLogTags();

      if (response.data) {
        setTags(response.data);
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

  const getLogDates = async (): Promise<void> => {
    try {
      const response: AxiosResponse<string[]> = await LogsApi.getLogDates();

      if (response.data) {
        setDates(response.data);
        selectDate(response.data[0]);
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

  const getLogs = async () => {
    setLogs([]);
    try {
      const response = await LogsApi.getLogs(
        selectedDate,
        logLevel,
        selectedTags.length ? JSON.stringify(selectedTags) : null
      );

      if (response.data) {
        setLogs(response.data);
      } else {
        setLogs([]);
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

  useEffect(() => {
    getLogTags();
    getLogDates();
  }, []);

  useEffect(() => {
    if (logLevel && selectedDate) {
      getLogs();
    }
  }, [JSON.stringify(selectedTags), selectedDate, logLevel]);

  const handleSelectTag = (tag: string) => {
    let selectedTagsNew: string[] = [...selectedTags];

    if (selectedTagsNew.includes(tag)) {
      selectedTagsNew = selectedTagsNew.filter(
        (selectedTag) => selectedTag !== tag
      );
    } else {
      selectedTagsNew.push(tag);
    }

    selectTags(selectedTagsNew);
  };

  const renderedTags = renderTags(tags, selectedTags, handleSelectTag);

  return (
    <>
      <Flex direction={'column'} padding={8}>
        <Flex direction={'row'} alignItems={'center'}>
          <Menu>
            <MenuButton as={Button} _focus={{ boxShadow: 'none' }}>
              {selectedDate}
            </MenuButton>
            <MenuList>
              {dates?.map((date) => (
                <MenuItem
                  _focus={{ boxShadow: 'none' }}
                  key={date}
                  onClick={() => selectDate(date)}
                >
                  {date}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Separator width={16} />
          <Menu>
            <MenuButton as={Button} _focus={{ boxShadow: 'none' }}>
              {logLevel}
            </MenuButton>
            <MenuList>
              <MenuItem
                _focus={{ boxShadow: 'none' }}
                onClick={() => setLogLevel('combined')}
              >
                {'combined'}
              </MenuItem>
              <MenuItem
                _focus={{ boxShadow: 'none' }}
                onClick={() => setLogLevel('error')}
              >
                {'error'}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Separator height={16} />
        <Flex direction={'row'} alignItems={'center'}>
          {renderedTags}
        </Flex>
        <Separator height={24} />
        <Flex
          overflowX={'hidden'}
          overflowY={'scroll'}
          maxHeight={'80vh !important'}
        >
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Timestamp</Th>
                <Th>Level</Th>
                <Th>Message</Th>
                <Spacer />
                <Th>Tags</Th>
              </Tr>
            </Thead>
            <Tbody overflowY={'scroll'} maxHeight={'80vh !important'}>
              {logs ? renderLogs(logs) : null}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};

export default LogsPage;
