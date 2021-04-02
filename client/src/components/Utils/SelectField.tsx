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
      name={name}
      control={control}
      defaultValue={withNone ? 'None' : optionValuesToMap[0]}
      render={({ field }): JSX.Element => {
        const { onChange, value } = field;

        return (
          <Autocomplete
            value={value}
            onChange={(_event, newValue): void => {
              onChange(newValue);
            }}
            defaultValue={withNone ? 'None' : optionValuesToMap[0]}
            options={
              withNone ? ['None', ...optionValuesToMap] : optionValuesToMap
            }
            style={{ width: 300 }}
            renderInput={(params): JSX.Element => (
              <TextField {...params} label={label} variant="outlined" />
            )}
            disableClearable
          />
        );
      }}
    />
  );
};

export default SelectField;
