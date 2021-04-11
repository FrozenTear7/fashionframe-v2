/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { Grid } from '@material-ui/core';
import * as React from 'react';
import useSetupPageStyles from './useSetupPageStyles';

const gridButtonWidth = 5;
const gridButtonHeight = 18;

interface DialogColorPickerProps {
  colorPicker: string[];
  colorPickerName: string;
  value: string;
}

const DialogColorPicker: React.VFC<DialogColorPickerProps> = ({
  colorPicker,
  colorPickerName,
  value,
}) => {
  const classes = useSetupPageStyles();

  return (
    <Grid container className={classes.colorPickerGrid}>
      {colorPicker.map((color, i) => {
        const colorName = `${colorPickerName}.${i % gridButtonWidth}.${
          Math.floor(i / gridButtonWidth) % gridButtonHeight
        }.${color}`;

        return (
          <Grid key={colorName} item className={classes.colorPickerGridItem}>
            <button
              type="button"
              className={
                color === value
                  ? classes.colorPickerButtonSelected
                  : classes.colorPickerButtonNotSelected
              }
              style={{
                background: color,
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DialogColorPicker;
