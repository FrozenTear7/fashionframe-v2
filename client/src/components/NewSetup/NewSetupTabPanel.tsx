import * as React from 'react';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const NewSetupTabPanel: React.VFC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`newsetup-tabpanel-${index}`}
      aria-labelledby={`newsetup-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default NewSetupTabPanel;
