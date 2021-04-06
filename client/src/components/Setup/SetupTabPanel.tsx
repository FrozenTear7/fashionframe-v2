import { Box } from '@material-ui/core';
import * as React from 'react';

interface SetupTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const SetupTabPanel: React.VFC<SetupTabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`setup-tabpanel-${index}`}
      aria-labelledby={`setup-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default SetupTabPanel;
