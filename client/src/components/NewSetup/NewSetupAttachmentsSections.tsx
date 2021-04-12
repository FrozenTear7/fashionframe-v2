/* eslint-disable @typescript-eslint/unbound-method */
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { WarframeData } from '../../types/WarframeData';
import SelectField from '../Utils/SelectField';

const NewSetupAttachmentsSection: React.VFC<
  Pick<
    WarframeData,
    | 'armAttachments'
    | 'chestAttachments'
    | 'ephemeras'
    | 'legAttachments'
    | 'frameSpecific'
  >
> = ({
  armAttachments,
  chestAttachments,
  ephemeras,
  legAttachments,
  frameSpecific,
}) => {
  const { watch } = useFormContext();

  return (
    <Grid container spacing={3} direction="column" alignContent="center">
      <Grid item>
        <SelectField
          optionValuesToMap={chestAttachments}
          name="attachments.chest"
          label="Chest"
        />
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={armAttachments}
          name="attachments.leftArm"
          label="Left arm"
        />
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={armAttachments}
          name="attachments.rightArm"
          label="Right arm"
        />
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={legAttachments}
          name="attachments.leftLeg"
          label="Left leg"
        />
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={legAttachments}
          name="attachments.rightLeg"
          label="Right leg"
        />
      </Grid>

      <Grid item>
        <SelectField
          optionValuesToMap={ephemeras}
          name="attachments.ephemera"
          label="Ephemera"
        />
      </Grid>

      {frameSpecific[watch('frame')] && (
        <Grid item>
          <SelectField
            optionValuesToMap={frameSpecific[watch('frame')]}
            name="attachments.frameSpecific"
            label="Frame specific"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default NewSetupAttachmentsSection;
