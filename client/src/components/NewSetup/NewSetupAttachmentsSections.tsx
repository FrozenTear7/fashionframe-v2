/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import SelectField from '../Utils/SelectField';

type AttachmentsSectionProps = {
  armAttachments: string[];
  chestAttachments: string[];
  ephemeras: string[];
  legAttachments: string[];
};

const NewSetupAttachmentsSection: React.VFC<AttachmentsSectionProps> = ({
  armAttachments,
  chestAttachments,
  ephemeras,
  legAttachments,
}) => {
  const { errors } = useFormContext();

  return (
    <>
      <label>Chest</label>
      <SelectField
        optionValuesToMap={chestAttachments}
        name="attachments.chest"
      />
      <p>{errors.attachments?.chest?.message}</p>

      <label>Left arm</label>
      <SelectField
        optionValuesToMap={armAttachments}
        name="attachments.leftArm"
      />
      <p>{errors.attachments?.leftArm?.message}</p>

      <label>Right arm</label>
      <SelectField
        optionValuesToMap={armAttachments}
        name="attachments.rightArm"
      />
      <p>{errors.attachments?.rightArm?.message}</p>

      <label>Left leg</label>
      <SelectField
        optionValuesToMap={legAttachments}
        name="attachments.leftLeg"
      />
      <p>{errors.attachments?.leftLeg?.message}</p>

      <label>Right leg</label>
      <SelectField
        optionValuesToMap={legAttachments}
        name="attachments.rightLeg"
      />
      <p>{errors.attachments?.rightLeg?.message}</p>

      <label>Ephemera</label>
      <SelectField optionValuesToMap={ephemeras} name="attachments.ephemera" />
      <p>{errors.attachments?.ephemera?.message}</p>
    </>
  );
};

export default NewSetupAttachmentsSection;
