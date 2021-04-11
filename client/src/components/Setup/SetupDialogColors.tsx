import * as React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ColorPickers } from '../../types/WarframeData';
import DialogColorPicker from './DialogColorPicker';
import getColorPickerClosestColor from '../../utils/getColorPickerClosestColor';

interface SetupDialogColorsProps {
  colorPickers: ColorPickers;
  currentColor: string;
}

const SetupDialogColors: React.VFC<SetupDialogColorsProps> = ({
  colorPickers,
  currentColor,
}) => {
  const [currentColorPicker, setCurrentColorPicker] = React.useState(
    Object.keys(colorPickers)[0]
  );

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Autocomplete
            id="color-picker"
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
          <DialogColorPicker
            colorPicker={colorPickers[currentColorPicker]}
            colorPickerName={currentColorPicker}
            value={getColorPickerClosestColor(
              colorPickers[currentColorPicker],
              currentColor
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SetupDialogColors;
