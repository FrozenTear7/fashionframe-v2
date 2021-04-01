/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Control, FieldErrors, FieldValues } from 'react-hook-form/dist/types';
import { Select, MenuItem } from '@material-ui/core';

type AttachmentsSectionProps = {
  armAttachments: string[];
  chestAttachments: string[];
  ephemeras: string[];
  legAttachments: string[];
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
};

const NewSetupAttachmentsSection: React.VFC<AttachmentsSectionProps> = ({
  armAttachments,
  chestAttachments,
  ephemeras,
  legAttachments,
  errors,
  control,
}) => {
  return (
    <>
      <label>Chest</label>
      <Controller
        as={
          <Select>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {chestAttachments.map((attachment) => (
              <MenuItem key={attachment} value={attachment}>
                {attachment}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="attachments.chest"
      />
      <p>{errors.attachments?.chest?.message}</p>

      <label>Left arm</label>
      <Controller
        as={
          <Select>
            <MenuItem value={undefined}>
              <em>None</em>
            </MenuItem>
            {armAttachments.map((attachment) => (
              <MenuItem key={attachment} value={attachment}>
                {attachment}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="attachments.leftArm"
      />
      <p>{errors.attachments?.leftArm?.message}</p>

      <label>Right arm</label>
      <Controller
        as={
          <Select>
            <MenuItem value={undefined}>
              <em>None</em>
            </MenuItem>
            {armAttachments.map((attachment) => (
              <MenuItem key={attachment} value={attachment}>
                {attachment}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="attachments.rightArm"
      />
      <p>{errors.attachments?.rightArm?.message}</p>

      <label>Left leg</label>
      <Controller
        as={
          <Select>
            <MenuItem value={undefined}>
              <em>None</em>
            </MenuItem>
            {legAttachments.map((attachment) => (
              <MenuItem key={attachment} value={attachment}>
                {attachment}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="attachments.leftLeg"
      />
      <p>{errors.attachments?.leftLeg?.message}</p>

      <label>Right leg</label>
      <Controller
        as={
          <Select>
            <MenuItem value={undefined}>
              <em>None</em>
            </MenuItem>
            {legAttachments.map((attachment) => (
              <MenuItem key={attachment} value={attachment}>
                {attachment}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="attachments.rightLeg"
      />
      <p>{errors.attachments?.rightLeg?.message}</p>

      <label>Ephemera</label>
      <Controller
        as={
          <Select>
            <MenuItem value={undefined}>
              <em>None</em>
            </MenuItem>
            {ephemeras.map((attachment) => (
              <MenuItem key={attachment} value={attachment}>
                {attachment}
              </MenuItem>
            ))}
          </Select>
        }
        control={control}
        name="attachments.ephemera"
      />
      <p>{errors.attachments?.ephemera?.message}</p>
    </>
  );
};

export default NewSetupAttachmentsSection;
