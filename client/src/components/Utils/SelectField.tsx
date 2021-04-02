import { MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Loading from './Loading';

type SelectFieldProps = {
  optionValuesToMap: string[];
  name: string;
  withNone?: boolean;
};

const SelectField: React.VFC<SelectFieldProps> = ({
  optionValuesToMap,
  name,
  withNone = true,
}) => {
  const { control } = useFormContext();

  if (!optionValuesToMap) return <Loading />;
  return (
    <Controller
      as={
        <Select>
          {withNone && (
            <MenuItem value={undefined}>
              <em>None</em>
            </MenuItem>
          )}
          {optionValuesToMap.map((optionValue) => (
            <MenuItem key={optionValue} value={optionValue}>
              {optionValue}
            </MenuItem>
          ))}
        </Select>
      }
      control={control}
      name={name}
    />
  );
};

export default SelectField;
