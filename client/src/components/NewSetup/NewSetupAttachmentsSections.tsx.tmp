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
      <>{errors.attachments?.chest?.message}</>

      <label>Left arm</label>
      <SelectField
        optionValuesToMap={armAttachments}
        name="attachments.leftArm"
      />
      <>{errors.attachments?.leftArm?.message}</>

      <label>Right arm</label>
      <SelectField
        optionValuesToMap={armAttachments}
        name="attachments.rightArm"
      />
      <>{errors.attachments?.rightArm?.message}</>

      <label>Left leg</label>
      <SelectField
        optionValuesToMap={legAttachments}
        name="attachments.leftLeg"
      />
      <>{errors.attachments?.leftLeg?.message}</>

      <label>Right leg</label>
      <SelectField
        optionValuesToMap={legAttachments}
        name="attachments.rightLeg"
      />
      <>{errors.attachments?.rightLeg?.message}</>

      <label>Ephemera</label>
      <SelectField optionValuesToMap={ephemeras} name="attachments.ephemera" />
      <>{errors.attachments?.ephemera?.message}</>
    </>
  );
};

export default NewSetupAttachmentsSection;
