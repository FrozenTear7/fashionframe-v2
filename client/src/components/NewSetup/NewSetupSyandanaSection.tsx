/* eslint-disable @typescript-eslint/unbound-method */
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import SelectField from '../Utils/SelectField';

interface SyandanaSectionProps {
  syandanas: string[];
}

const NewSetupSyandanaSection: React.VFC<SyandanaSectionProps> = ({
  syandanas,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid container spacing={3} direction="column" alignContent="center">
        <Grid item>
          <SelectField
            optionValuesToMap={syandanas}
            name="syandana.name"
            label="Syandana"
          />
          <>{errors.syandana?.name?.message}</>
        </Grid>
      </Grid>
    </>
  );
};

export default NewSetupSyandanaSection;
