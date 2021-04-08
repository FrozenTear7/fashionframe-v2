/* eslint-disable @typescript-eslint/unbound-method */
import { capitalize, Grid } from '@material-ui/core';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import ColorPicker from '../ColorPicker/ColorPicker';
import ColorSchemeButton from '../ColorPicker/ColorSchemeButton';
import useNewSetupFormStyles from './useNewSetupFormStyles';

type SetupSectionProps = {
  dataPrefix: string;
  colorPickers: { [colorPicker: string]: string[] };
};

const ColorSchemeSubsection: React.VFC<SetupSectionProps> = ({
  dataPrefix,
  colorPickers,
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
        <Grid container item spacing={2} justify="space-between">
          <Grid item md={12}>
            {colorSchemeButton(color)}
          </Grid>
        </Grid>
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
          <Grid item md={6}>
            {colorSchemeButton(`${color}1`)}
          </Grid>
          <Grid item md={6}>
            {colorSchemeButton(`${color}2`)}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container justify="center" alignContent="center" spacing={3}>
      <Grid
        container
        item
        lg={4}
        direction="column"
        spacing={1}
        alignContent="center"
      >
        {singleColorItem('primary')}
        {singleColorItem('secondary')}
        {singleColorItem('tertiary')}
        {singleColorItem('accents')}
        {doubleColorItem('emmissive')}
        {doubleColorItem('energy')}
      </Grid>
      <Grid item lg={8}>
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
