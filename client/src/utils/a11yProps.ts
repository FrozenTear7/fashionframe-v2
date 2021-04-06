const a11yProps = (
  label: string,
  index: number
): { id: string; 'aria-controls': string } => {
  return {
    id: `${label}-tab-${index}`,
    'aria-controls': `${label}-tabpanel-${index}`,
  };
};

export default a11yProps;
