/* eslint-disable @typescript-eslint/unbound-method */
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import SelectField from '../Utils/SelectField';

interface AttachmentsSectionProps {
  armAttachments: string[];
  chestAttachments: string[];
  ephemeras: string[];
  legAttachments: string[];
}

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
    <Grid container spacing={3}>
      <Grid item>
        <SelectField
          optionValuesToMap={chestAttachments}
          name="attachments.chest"
          label="Chest"
        />
        <>{errors.attachments?.chest?.message}</>
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={armAttachments}
          name="attachments.leftArm"
          label="Left arm"
        />
        <>{errors.attachments?.leftArm?.message}</>
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={armAttachments}
          name="attachments.rightArm"
          label="Right arm"
        />
        <>{errors.attachments?.rightArm?.message}</>
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={legAttachments}
          name="attachments.leftLeg"
          label="Left leg"
        />
        <>{errors.attachments?.leftLeg?.message}</>
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={legAttachments}
          name="attachments.rightLeg"
          label="Right leg"
        />
        <>{errors.attachments?.rightLeg?.message}</>
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={ephemeras}
          name="attachments.ephemera"
          label="Ephemera"
        />
        <>{errors.attachments?.ephemera?.message}</>
      </Grid>
    </Grid>
  );
};

export default NewSetupAttachmentsSection;
