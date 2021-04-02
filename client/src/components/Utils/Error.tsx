import * as React from 'react';

const Error: React.VFC<{ error: string }> = ({ error }) => {
  return <div className="Error">Error: {error}</div>;
};

export default Error;
