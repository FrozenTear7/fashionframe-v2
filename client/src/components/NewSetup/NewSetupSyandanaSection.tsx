/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import SelectField from '../Utils/SelectField';

type SyandanaSectionProps = {
  syandanas: string[];
};

const NewSetupSyandanaSection: React.VFC<SyandanaSectionProps> = ({
  syandanas,
}) => {
  const { errors } = useFormContext();

  return (
    <>
      <label>Syandana</label>
      <SelectField optionValuesToMap={syandanas} name="syandana.name" />
      <p>{errors.syandana?.name?.message}</p>
    </>
  );
};

export default NewSetupSyandanaSection;
