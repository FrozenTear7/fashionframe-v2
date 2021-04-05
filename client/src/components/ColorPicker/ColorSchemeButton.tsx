import { Button } from '@material-ui/core';
import * as React from 'react';
import useColorPickerStyles from './useColorPickerStyles';

interface ColorSchemeButtonProps {
  color: string;
  onClick: () => void;
}

const ColorSchemeButton: React.VFC<ColorSchemeButtonProps> = ({
  color,
  onClick,
}) => {
  const colorPickerClasses = useColorPickerStyles();

  return (
    <Button
      className={colorPickerClasses.colorSchemeButton}
      style={{
        backgroundColor: color,
      }}
      onClick={onClick}
    />
  );
};

export default ColorSchemeButton;
