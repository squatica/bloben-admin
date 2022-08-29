import React from 'react';

const Separator = (props: any) => {
  return (
    <div
      style={{
        height: props.height ? props.height : 40,
        width: props.width ? props.width : 20,
      }}
    />
  );
};

export default Separator;
