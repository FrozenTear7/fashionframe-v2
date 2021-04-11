import { Box, CircularProgress } from '@material-ui/core';
import * as React from 'react';

const Loading: React.VFC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={12}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
