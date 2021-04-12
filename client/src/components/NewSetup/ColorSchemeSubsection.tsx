/* eslint-disable @typescript-eslint/unbound-method */
import { Button, capitalize, Grid } from '@material-ui/core';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import ColorPicker from '../ColorPicker/ColorPicker';
import ColorSchemeButton from '../ColorPicker/ColorSchemeButton';
import useNewSetupFormStyles from './useNewSetupFormStyles';

type SetupSectionProps = {
  dataPrefix: string;
  colorPickers: { [colorPicker: string]: string[] };
  withCopyMain?: boolean;
};

const ColorSchemeSubsection: React.VFC<SetupSectionProps> = ({
  dataPrefix,
  colorPickers,
  withCopyMain = false,
}) => {
  const classes = useNewSetupFormStyles();
  const { setValue, watch } = useFormContext();

  const [currentColor, setCurrentColor] = React.useState('primary');

  const colorSchemeButton = (color: string): JSX.Element => {
    return (
      <ColorSchemeButton
        color={
          watch(`${dataPrefix}.${color}`)
            ? String(watch(`${dataPrefix}.${color}`)).split('.')[3]
            : null
        }
        onClick={(): void => setCurrentColor(color)}
      />
    );
  };

  const singleColorItem = (color: string): JSX.Element => {
    return (
      <Grid container item spacing={1} direction="column">
        <Grid item>
          {currentColor === color ? (
            <strong className={classes.selectedColorTitle}>
              {capitalize(color)}
            </strong>
          ) : (
            capitalize(color)
          )}
        </Grid>
        <Grid item>{colorSchemeButton(color)}</Grid>
      </Grid>
    );
  };

  const doubleColorItem = (color: string): JSX.Element => {
    return (
      <Grid container item spacing={1} direction="column">
        <Grid item>
          {currentColor === `${color}1` || currentColor === `${color}2` ? (
            <strong className={classes.selectedColorTitle}>
              {capitalize(color)}
            </strong>
          ) : (
            capitalize(color)
          )}
        </Grid>
        <Grid container item spacing={2} justify="space-between">
          <Grid item>{colorSchemeButton(`${color}1`)}</Grid>
          <Grid item>{colorSchemeButton(`${color}2`)}</Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container justify="space-around" spacing={3}>
      <Grid item>
        <Grid
          container
          item
          direction="column"
          spacing={1}
          alignItems="flex-start"
        >
          <Grid item>{singleColorItem('primary')}</Grid>
          <Grid item>{singleColorItem('secondary')}</Grid>
          <Grid item>{singleColorItem('tertiary')}</Grid>
          <Grid item>{singleColorItem('accents')}</Grid>
          <Grid item>{doubleColorItem('emmissive')}</Grid>
          <Grid item>{doubleColorItem('energy')}</Grid>
          {withCopyMain && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={(): void => {
                  setValue(dataPrefix, watch('colorScheme'));
                }}
              >
                Copy main colors
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <ColorPicker
          colorPickers={colorPickers}
          onChange={(valueName, newValue): void => {
            setValue(valueName, newValue);
          }}
          value={watch(`${dataPrefix}.${currentColor}`)}
          valueToChange={`${dataPrefix}.${currentColor}`}
        />
      </Grid>
    </Grid>
  );
};

export default ColorSchemeSubsection;
