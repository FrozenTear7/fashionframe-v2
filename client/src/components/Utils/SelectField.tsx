import { TextField } from '@material-ui/core';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loading from './Loading';

type SelectFieldProps = {
  optionValuesToMap: string[];
  name: string;
  label: string;
  withNone?: boolean;
};

const SelectField: React.VFC<SelectFieldProps> = ({
  optionValuesToMap,
  name,
  label,
  withNone = true,
}) => {
  const { control } = useFormContext();

  if (!optionValuesToMap) return <Loading />;
  return (
    <Controller
      name={`${name[0].toUpperCase()}${name.substr(1, name.length - 1)}`}
      control={control}
      render={({ field }): JSX.Element => (
        <Autocomplete
          {...field}
          defaultValue={withNone ? 'None' : optionValuesToMap[0]}
          options={
            withNone ? ['None', ...optionValuesToMap] : optionValuesToMap
          }
          getOptionLabel={(option: string): string => option}
          style={{ width: 300 }}
          renderInput={(params): JSX.Element => (
            <TextField {...params} label={label} variant="outlined" />
          )}
          onChange={(e): void => console.log(e)}
        />
      )}
    />
  );
};

export default SelectField;
