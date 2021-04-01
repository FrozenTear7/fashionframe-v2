/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import {
  FieldElement,
  FieldErrors,
  FieldValues,
  Ref,
} from 'react-hook-form/dist/types';
import { WarframeData } from '../../types/WarframeData';

type SyandanaSectionProps = {
  warframeData: WarframeData;
  register: (ref: (FieldElement & Ref) | null) => void;
  errors: FieldErrors<FieldValues>;
};

const NewSetupSyandanaSection: React.VFC<SyandanaSectionProps> = ({
  warframeData,
  register,
  errors,
}) => {
  return (
    <>
      <label>Syandana</label>
      <select name="syandana.name" ref={register}>
        {warframeData.syandanas.map((syandana) => (
          <option key={syandana} value={syandana}>
            {syandana}
          </option>
        ))}
      </select>
      <p>{errors.syandana?.name?.message}</p>
    </>
  );
};

export default NewSetupSyandanaSection;
