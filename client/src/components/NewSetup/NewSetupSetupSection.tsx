/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import SelectField from '../Utils/SelectField';

type SetupSectionProps = {
  frames: string[];
  helmets: { [frame: string]: string[] };
  skins: { [frame: string]: string[] };
};

const NewSetupSetupSection: React.VFC<SetupSectionProps> = ({
  frames: _frames,
  helmets,
  skins,
}) => {
  const methods = useFormContext();
  const {
    formState: { errors },
    watch,
  } = methods;
  const { frame: currentFrame } = watch();

  return (
    <>
      {/* <label>Frame</label>
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
      <>{errors.frame?.message}</> */}

      <SelectField
        optionValuesToMap={helmets[currentFrame]}
        name="helmet"
        label="Helmet"
        withNone={false}
      />
      <>{errors.helmet?.message}</>

      <SelectField
        optionValuesToMap={skins[currentFrame]}
        name="skin"
        label="Skin"
        withNone={false}
      />
      <>{errors.skin?.message}</>
    </>
  );
};

export default NewSetupSetupSection;
