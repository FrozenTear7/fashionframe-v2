/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  Control,
  FieldElement,
  FieldErrors,
  FieldName,
  FieldValues,
  Ref,
  SetFieldValue,
  SetValueConfig,
} from 'react-hook-form/dist/types';
import { Select, MenuItem } from '@material-ui/core';

type SetupSectionProps = {
  frames: string[];
  helmets: { [frame: string]: string[] };
  skins: { [frame: string]: string[] };
  currentFrame: string;
  register: (ref: (FieldElement & Ref) | null) => void;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
  setValue: (
    name: FieldName<FieldValues>,
    value: SetFieldValue<FieldValues>,
    config?: SetValueConfig
  ) => void;
};

const NewSetupSetupSection: React.VFC<SetupSectionProps> = ({
  frames,
  helmets,
  skins,
  currentFrame,
  register,
  errors,
  control,
  setValue,
}) => {
  return (
    <>
      <label>Name</label>
      <input name="name" ref={register} />
      <p>{errors.name?.message}</p>

      <label>Description</label>
      <textarea name="description" ref={register} />
      <p>{errors.description?.message}</p>

      <label>Frame</label>
      <Controller
        name="frame"
        control={control}
        render={({ onChange, value }): JSX.Element => (
          <Select
            value={value}
            onChange={(e): void => {
              onChange(e.target.value);
              setValue('helmet', `${String(e.target.value)} Helmet`);
              setValue('skin', `${String(e.target.value)} Skin`);
            }}
          >
            {frames.map((frame) => (
              <MenuItem key={frame} value={frame}>
                {frame}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <p>{errors.frame?.message}</p>

      <label>Helmet</label>
      <Controller
        as={
          <Select>
            {helmets[currentFrame].map((helmet) => (
              <MenuItem key={helmet} value={helmet}>
                {helmet}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="helmet"
      />
      <p>{errors.helmet?.message}</p>

      <label>Skin</label>
      <Controller
        as={
          <Select>
            {skins[currentFrame].map((skin) => (
              <MenuItem key={skin} value={skin}>
                {skin}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="skin"
      />
      <p>{errors.skin?.message}</p>

      <label>Screenshot</label>
      <input
        name="screenshotImage"
        type="file"
        accept="image/*"
        ref={register}
      />
      <p>{(errors.screenshotImage as { message: string })?.message}</p>
    </>
  );
};

export default NewSetupSetupSection;
