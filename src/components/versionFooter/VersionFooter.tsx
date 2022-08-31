import React, { useContext } from 'react';

import './VersionFooter.css';
import { Context } from '../../context/store';

const VersionFooter = () => {
  const [store] = useContext(Context);

  const { version } = store;

  return (
    <div className={'VersionFooter__container'}>
      <p className={'VersionFooter__text'}>{`Version ${
        import.meta.env.VITE_APP_VERSION
      }`}</p>
      {version ? (
        <p className={'VersionFooter__text'}>{`Api version ${version}`}</p>
      ) : null}
    </div>
  );
};

export default VersionFooter;
