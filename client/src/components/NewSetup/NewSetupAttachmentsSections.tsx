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
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <SelectField
        optionValuesToMap={chestAttachments}
        name="attachments.chest"
        label="Chest"
      />
      <>{errors.attachments?.chest?.message}</>

      <SelectField
        optionValuesToMap={armAttachments}
        name="attachments.leftArm"
        label="Left arm"
      />
      <>{errors.attachments?.leftArm?.message}</>

      <SelectField
        optionValuesToMap={armAttachments}
        name="attachments.rightArm"
        label="Right arm"
      />
      <>{errors.attachments?.rightArm?.message}</>

      <SelectField
        optionValuesToMap={legAttachments}
        name="attachments.leftLeg"
        label="Left leg"
      />
      <>{errors.attachments?.leftLeg?.message}</>

      <SelectField
        optionValuesToMap={legAttachments}
        name="attachments.rightLeg"
        label="Right leg"
      />
      <>{errors.attachments?.rightLeg?.message}</>

      <SelectField
        optionValuesToMap={ephemeras}
        name="attachments.ephemera"
        label="Ephemera"
      />
      <>{errors.attachments?.ephemera?.message}</>
    </>
  );
};

export default NewSetupAttachmentsSection;
