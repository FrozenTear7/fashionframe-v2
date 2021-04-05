/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as React from 'react';
import useColorPickerStyles from './useColorPickerStyles';

const colorPicker = 'Classic';
const gridButtonWidth = 5;
const gridButtonHeight = 18;

interface ColorPickerProps {
  colorPickers: { [colorPicker: string]: string[] };
  value: string;
}

const ColorPicker: React.VFC<ColorPickerProps> = ({ colorPickers, value }) => {
  const classes = useColorPickerStyles();

  const [valueColorPicker, valueColumn, valueRow, valueColor] = value.split(
    '.'
  );

  const [currentColorPicker, setCurrentColorPicker] = React.useState<string>(
    valueColorPicker
  );

  console.log(colorPickers);
  console.log(valueColorPicker, valueColumn, valueRow, valueColor);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item>
          <Autocomplete
            id="color-picker-filter"
            value={currentColorPicker}
            onChange={(_event, newValue): void => {
              setCurrentColorPicker(newValue);
            }}
            style={{ width: 300 }}
            options={Object.keys(colorPickers)}
            renderInput={(params): JSX.Element => (
              <TextField {...params} label="Color picker" variant="outlined" />
            )}
            disableClearable
          />
        </Grid>
        <Grid item>
          <Grid container className={classes.colorPickerGrid}>
            {colorPickers[currentColorPicker].map((color, i) => {
              const colorName = `${colorPicker}.${i % gridButtonWidth}.${
                Math.floor(i / gridButtonWidth) % gridButtonHeight
              }.${color}`;

              return (
                <Grid
                  key={colorName}
                  item
                  className={classes.colorPickerGridItem}
                >
                  <button
                    type="button"
                    className={classes.colorPickerButton}
                    style={{
                      background: color,
                    }}
                    onClick={(): void => console.log(colorName)}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Button />
        </Grid>
      </Grid>
    </>
  );
};

export default ColorPicker;
