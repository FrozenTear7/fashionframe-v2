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
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <SelectField
        optionValuesToMap={syandanas}
        name="syandana.name"
        label="Syandana"
      />
      <>{errors.syandana?.name?.message}</>
    </>
  );
};

export default NewSetupSyandanaSection;
