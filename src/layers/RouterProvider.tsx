import { Route, Routes } from 'react-router-dom';
import LogsPage from '../pages/LogsPage';
import React from 'react';
import ServerSettingsPage from '../pages/ServerSettingsPage';
import SettingsPage from 'pages/SettingsPage';
import UsersPage from '../pages/UsersPage';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path={'/admin/logs'} element={<LogsPage />} />
      <Route path={'/admin/users'} element={<UsersPage />} />
      <Route path={'/admin/settings'} element={<SettingsPage />} />
      <Route path={'/admin/server-settings'} element={<ServerSettingsPage />} />
    </Routes>
  );
};

export default RouterProvider;
