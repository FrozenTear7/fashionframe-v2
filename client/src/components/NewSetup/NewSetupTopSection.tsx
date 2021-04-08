import { Controller, useFormContext } from 'react-hook-form';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';
import useNewSetupFormStyles from './useNewSetupFormStyles';

const NewSetupTopSection: React.VFC = () => {
  const classes = useNewSetupFormStyles();

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { screenshotImage: currentScreenshot } = watch();

  console.log('Errors: ', errors);
  console.log(watch());

  return (
    <>
      <Grid container item md={4} direction="column">
        <Grid item>
          <Controller
            name="name"
            control={control}
            render={({ field }): JSX.Element => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                error={!!errors.name?.message}
                helperText={errors.name?.message ? errors.name?.message : ''}
                autoFocus
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="description"
            control={control}
            render={({ field }): JSX.Element => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                multiline
                rowsMax={5}
                fullWidth
                id="description"
                label="Description"
                error={!!errors.description?.message}
                helperText={
                  errors.description?.message ? errors.description?.message : ''
                }
              />
            )}
          />
        </Grid>
        <Grid container item direction="column" alignContent="center">
          <input
            {...register('screenshotImage')}
            id="screenshotImage"
            name="screenshotImage"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          <label htmlFor="screenshotImage">
            <Button component="span" variant="contained" color="primary">
              Screenshot
            </Button>
            <p>
              <small className={classes.screenshotImageError}>
                {errors.screenshotImage?.message}
              </small>
            </p>
          </label>
        </Grid>
      </Grid>
      <Grid container item md={8} alignContent="center" justify="center">
        {currentScreenshot && currentScreenshot.length > 0 && (
          <img
            className={classes.screenshotImage}
            alt="Screenshot"
            src={URL.createObjectURL(currentScreenshot[0])}
          />
        )}
      </Grid>
    </>
  );
};

export default NewSetupTopSection;
