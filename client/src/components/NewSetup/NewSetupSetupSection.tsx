/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import {
  FieldElement,
  FieldErrors,
  FieldValues,
  Ref,
} from 'react-hook-form/dist/types';
import { WarframeData } from '../../types/WarframeData';

type SetupSectionProps = {
  warframeData: WarframeData;
  currentFrame: string;
  register: (ref: (FieldElement & Ref) | null) => void;
  errors: FieldErrors<FieldValues>;
};

const NewSetupSetupSection: React.VFC<SetupSectionProps> = ({
  warframeData,
  currentFrame,
  register,
  errors,
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
      <select name="frame" ref={register}>
        {warframeData.frames.map((frame) => (
          <option key={frame} value={frame}>
            {frame}
          </option>
        ))}
      </select>
      <p>{errors.frame?.message}</p>

      <label>Helmet</label>
      <select name="helmet" ref={register}>
        {currentFrame &&
          warframeData.helmets[currentFrame].map((helmet) => (
            <option key={helmet} value={helmet}>
              {helmet}
            </option>
          ))}
      </select>
      <p>{errors.helmet?.message}</p>

      <label>Skin</label>
      <select name="skin" ref={register}>
        {currentFrame &&
          warframeData.skins[currentFrame].map((skin) => (
            <option key={skin} value={skin}>
              {skin}
            </option>
          ))}
      </select>
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
