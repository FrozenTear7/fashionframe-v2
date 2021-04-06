/* eslint-disable @typescript-eslint/unbound-method */
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { WarframeData } from '../../types/WarframeData';
import SelectField from '../Utils/SelectField';

const NewSetupSyandanaSection: React.VFC<Pick<WarframeData, 'syandanas'>> = ({
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
