/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Control, FieldErrors, FieldValues } from 'react-hook-form/dist/types';
import { Select, MenuItem } from '@material-ui/core';

type SyandanaSectionProps = {
  syandanas: string[];
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
};

const NewSetupSyandanaSection: React.VFC<SyandanaSectionProps> = ({
  syandanas,
  errors,
  control,
}) => {
  return (
    <>
      <label>Syandana</label>
      <Controller
        as={
          <Select>
            <MenuItem value={undefined}>
              <em>None</em>
            </MenuItem>
            {syandanas.map((syandana) => (
              <MenuItem key={syandana} value={syandana}>
                {syandana}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="syandana.name"
      />
      <p>{errors.syandana?.name?.message}</p>
    </>
  );
};

export default NewSetupSyandanaSection;
