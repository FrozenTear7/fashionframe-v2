import { Button } from '@material-ui/core';
import * as React from 'react';
import useColorPickerStyles from './useColorPickerStyles';

interface ColorSchemeButtonProps {
  color: string | null;
  onClick: () => void;
}

const ColorSchemeButton: React.VFC<ColorSchemeButtonProps> = ({
  color,
  onClick,
}) => {
  const classes = useColorPickerStyles();

  if (color) {
    return (
      <Button
        className={classes.colorSchemeButton}
        style={{
          backgroundColor: color || '#FFFFFF',
        }}
        onClick={onClick}
      />
    );
  }
  return (
    <Button className={classes.colorSchemeButtonCheckered} onClick={onClick} />
  );
};

export default ColorSchemeButton;
