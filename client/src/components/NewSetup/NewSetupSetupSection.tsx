/* eslint-disable @typescript-eslint/unbound-method */
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SelectField from '../Utils/SelectField';

interface SetupSectionProps {
  frames: string[];
  helmets: { [frame: string]: string[] };
  skins: { [frame: string]: string[] };
}

const NewSetupSetupSection: React.VFC<SetupSectionProps> = ({
  frames,
  helmets,
  skins,
}) => {
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = methods;
  const { frame: currentFrame } = watch();

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Controller
          name="frame"
          control={control}
          defaultValue={frames[0]}
          render={({ field }): JSX.Element => {
            const { onChange, value } = field;

            return (
              <Autocomplete
                value={value}
                onChange={(_event, newValue): void => {
                  onChange(newValue);
                  setValue('helmet', `${String(newValue)} Helmet`);
                  setValue('skin', `${String(newValue)} Skin`);
                }}
                options={frames}
                style={{ width: 300 }}
                renderInput={(params): JSX.Element => (
                  <TextField {...params} label="Frame" variant="outlined" />
                )}
                disableClearable
              />
            );
          }}
        />
        <>{errors.frame?.message}</>
      </Grid>
      <Grid item>
        <SelectField
          optionValuesToMap={helmets[currentFrame]}
          name="helmet"
          label="Helmet"
          withNone={false}
        />
        <>{errors.helmet?.message}</>
      </Grid>
      <Grid item>
        <SelectField
          optionValuesToMap={skins[currentFrame]}
          name="skin"
          label="Skin"
          withNone={false}
        />
        <>{errors.skin?.message}</>
      </Grid>
    </Grid>
  );
};

export default NewSetupSetupSection;
