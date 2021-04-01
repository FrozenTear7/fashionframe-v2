/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import {
  FieldElement,
  FieldErrors,
  FieldValues,
  Ref,
} from 'react-hook-form/dist/types';
import { WarframeData } from '../../types/WarframeData';

type AttachmentsSectionProps = {
  warframeData: WarframeData;
  register: (ref: (FieldElement & Ref) | null) => void;
  errors: FieldErrors<FieldValues>;
};

const NewSetupAttachmentsSection: React.VFC<AttachmentsSectionProps> = ({
  warframeData,
  register,
  errors,
}) => {
  return (
    <>
      <label>Chest</label>
      <select name="attachments.chest" ref={register}>
        {warframeData.chestAttachments.map((attachment) => (
          <option key={attachment} value={attachment}>
            {attachment}
          </option>
        ))}
      </select>
      <p>{errors.attachments?.chest?.message}</p>

      <label>Left arm</label>
      <select name="attachments.leftArm" ref={register}>
        {warframeData.armAttachments.map((attachment) => (
          <option key={attachment} value={attachment}>
            {attachment}
          </option>
        ))}
      </select>
      <p>{errors.attachments?.leftArm?.message}</p>

      <label>Right arm</label>
      <select name="attachments.rightArm" ref={register}>
        {warframeData.armAttachments.map((attachment) => (
          <option key={attachment} value={attachment}>
            {attachment}
          </option>
        ))}
      </select>
      <p>{errors.attachments?.rightArm?.message}</p>

      <label>Left leg</label>
      <select name="attachments.leftLeg" ref={register}>
        {warframeData.legAttachments.map((attachment) => (
          <option key={attachment} value={attachment}>
            {attachment}
          </option>
        ))}
      </select>
      <p>{errors.attachments?.leftLeg?.message}</p>

      <label>Right leg</label>
      <select name="attachments.rightLeg" ref={register}>
        {warframeData.legAttachments.map((attachment) => (
          <option key={attachment} value={attachment}>
            {attachment}
          </option>
        ))}
      </select>
      <p>{errors.attachments?.rightLeg?.message}</p>

      <label>Ephemera</label>
      <select name="attachments.ephemera" ref={register}>
        {warframeData.ephemeras.map((ephemera) => (
          <option key={ephemera} value={ephemera}>
            {ephemera}
          </option>
        ))}
      </select>
      <p>{errors.attachments?.ephemera?.message}</p>
    </>
  );
};

export default NewSetupAttachmentsSection;
