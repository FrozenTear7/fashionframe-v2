import * as React from 'react';
import { GithubPicker } from 'react-color';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, MenuItem, Button, Popover } from '@material-ui/core';
import fixColors from '../../utils/fixColors';

type ColorSelectProps = {
  valueToSet: string;
  colorPickers: { [colorPicker: string]: string[] };
};

const ColorSelect: React.VFC<ColorSelectProps> = ({
  valueToSet,
  colorPickers,
}) => {
  const { control } = useFormContext();
  const [currentColorPicker, setCurrentColorPicker] = React.useState<string>(
    'Agony'
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Controller
        control={control}
        name={valueToSet}
        defaultValue={null}
        render={({ onChange, ref }): JSX.Element => (
          <>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              style={{
                width: '40px !important',
                height: '40px',
                backgroundColor: `${valueToSet}`,
              }}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <>
                <Select
                  value={currentColorPicker}
                  onChange={(e): void => {
                    setCurrentColorPicker(String(e.target.value));
                  }}
                >
                  {Object.keys(colorPickers).map((colorPicker) => (
                    <MenuItem key={colorPicker} value={colorPicker}>
                      {colorPicker}
                    </MenuItem>
                  ))}
                </Select>
                <GithubPicker
                  ref={ref}
                  colors={fixColors(colorPickers[currentColorPicker])} // Terrible solution, but no idea how to override keys
                  triangle="hide"
                  width="125px"
                  onChangeComplete={({ hex }): void => {
                    onChange(hex);
                  }}
                />
              </>
            </Popover>
          </>
        )}
      />
    </>
  );
};

export default ColorSelect;
