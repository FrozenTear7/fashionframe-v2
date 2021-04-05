/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as React from 'react';
import useColorPickerStyles from './useColorPickerStyles';

const gridButtonWidth = 5;
const gridButtonHeight = 18;

interface ColorPickerProps {
  colorPickers: { [colorPicker: string]: string[] };
  value: string;
  onChange: (newValue: string) => void;
}

const ColorPicker: React.VFC<ColorPickerProps> = ({
  colorPickers,
  value,
  onChange,
}) => {
  const classes = useColorPickerStyles();

  const [valueColorPicker, valueColumn, valueRow, valueColor] = value.split(
    '.'
  );

  const [currentColorPicker, setCurrentColorPicker] = React.useState<string>(
    valueColorPicker
  );

  React.useEffect(() => {
    setCurrentColorPicker(valueColorPicker);
  }, [value]);

  console.log('BEEP BOOP');

  return (
    <>
      <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <Autocomplete
            id="color-picker-filter"
            value={currentColorPicker}
            onChange={(_event, newValue): void => {
              setCurrentColorPicker(newValue);
            }}
            style={{ width: 150 }}
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
              const colorName = `${currentColorPicker}.${i % gridButtonWidth}.${
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
                    onClick={(): void => {
                      onChange(colorName);
                    }}
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

export default React.memo(ColorPicker, (prevProps, nextProps) => {
  if (prevProps.value !== nextProps.value) return false;
  return true;
});
