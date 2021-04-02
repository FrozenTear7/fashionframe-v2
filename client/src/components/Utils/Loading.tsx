import { CircularProgress } from '@material-ui/core';
import * as React from 'react';

const Loading: React.VFC = () => {
  return (
    <div className="Loading">
      <CircularProgress />
    </div>
  );
};

export default Loading;
