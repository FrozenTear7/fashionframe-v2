/* eslint-disable @typescript-eslint/unbound-method */
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import ColorPicker from '../ColorPicker/ColorPicker';
import ColorSchemeButton from '../ColorPicker/ColorSchemeButton';

type SetupSectionProps = {
  dataPrefix: string;
  colorPickers: { [colorPicker: string]: string[] };
};

const ColorSchemeSubsection: React.VFC<SetupSectionProps> = ({
  dataPrefix,
  colorPickers,
}) => {
  const { setValue, watch } = useFormContext();

  const [currentColor, setCurrentColor] = React.useState('primary');

  const colorSchemeButton = (color: string): JSX.Element => (
    <ColorSchemeButton
      color={String(watch(`${dataPrefix}.${color}`)).split('.')[3]}
      onClick={(): void => setCurrentColor(color)}
    />
  );

  return (
    <>
      <Grid container justify="center" alignContent="center" spacing={3}>
        <Grid
          container
          item
          md={4}
          direction="column"
          spacing={1}
          alignContent="center"
        >
          <Grid container item alignItems="center" justify="space-between">
            <Grid item md={6}>
              Primary
            </Grid>
            <Grid item md={6}>
              {colorSchemeButton('primary')}
            </Grid>
          </Grid>
          <Grid container item alignItems="center" justify="space-between">
            <Grid item md={6}>
              Secondary
            </Grid>
            <Grid item md={6}>
              {colorSchemeButton('secondary')}
            </Grid>
          </Grid>
          <Grid container item alignItems="center" justify="space-between">
            <Grid item md={6}>
              Tertiary
            </Grid>
            <Grid item md={6}>
              {colorSchemeButton('tertiary')}
            </Grid>
          </Grid>
          <Grid container item alignItems="center" justify="space-between">
            <Grid item md={6}>
              Accents
            </Grid>
            <Grid item md={6}>
              {colorSchemeButton('accents')}
            </Grid>
          </Grid>
          <Grid container item alignItems="center" justify="space-between">
            <Grid item md={6}>
              Emmissive
            </Grid>
            <Grid item md={3}>
              {colorSchemeButton('emmissive1')}
            </Grid>
            <Grid item md={3}>
              {colorSchemeButton('emmissive2')}
            </Grid>
          </Grid>
          <Grid container item alignItems="center" justify="space-between">
            <Grid item md={6}>
              Energy
            </Grid>
            <Grid item md={3}>
              {colorSchemeButton('energy1')}
            </Grid>
            <Grid item md={3}>
              {colorSchemeButton('energy2')}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8}>
          <ColorPicker
            colorPickers={colorPickers}
            value={watch(`${dataPrefix}.${currentColor}`)}
            onChange={(newValue): void => {
              setValue(`${dataPrefix}`, {
                ...watch(`${dataPrefix}`),
                [currentColor]: newValue,
              });
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ColorSchemeSubsection;
