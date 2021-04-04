import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, TextField } from '@material-ui/core';
import { WarframeData } from '../../types/WarframeData';
import Error from '../Utils/Error';
import newSetupSchema from '../../validation/newSetupSchema';
import { NewSetupFormData } from '../../types/Setup';
import NewSetupSetupSection from './NewSetupSetupSection';
import NewSetupSyandanaSection from './NewSetupSyandanaSection';
import NewSetupAttachmentsSection from './NewSetupAttachmentsSections';
import NewSetupTabPanel from './NewSetupTabPanel';
import useNewSetupFormStyles from './useNewSetupFormStyles';
// import ColorSchemeSubsection from './ColorSchemeSubsection';

const newSetupFormDefaultValues = {
  name: '',
  description: '',
  frame: 'Ash',
  helmet: 'Ash Helmet',
  skin: 'Ash Skin',
  attachments: {
    chest: 'None',
    leftArm: 'None',
    rightArm: 'None',
    leftLeg: 'None',
    rightLeg: 'None',
    ephemera: 'None',
  },
  syandana: {
    name: 'None',
  },
};

const a11yProps = (index: number): { id: string; 'aria-controls': string } => {
  return {
    id: `newsetup-tab-${index}`,
    'aria-controls': `newsetup-tabpanel-${index}`,
  };
};

const NewSetupForm: React.VFC<{ warframeData: WarframeData }> = ({
  warframeData,
}) => {
  const history = useHistory();
  const classes = useNewSetupFormStyles();

  const [createSetupError, setCreateSetupError] = React.useState<string>();
  const [value, setValue] = React.useState(0);

  const {
    frames,
    helmets,
    skins,
    chestAttachments,
    armAttachments,
    legAttachments,
    ephemeras,
    syandanas,
    // colorPickers,
  } = warframeData;

  const methods = useForm<NewSetupFormData>({
    resolver: yupResolver(newSetupSchema),
    defaultValues: newSetupFormDefaultValues,
  });
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const newSetupFormOnSubmit = handleSubmit(async (setupWithImage) => {
    console.log(setupWithImage);
    const { screenshotImage, ...setup } = setupWithImage;

    const bodyFormData = new FormData();
    bodyFormData.append('screenshotImage', screenshotImage[0]);
    bodyFormData.append('setup', JSON.stringify(setup));

    try {
      const { data } = await axios({
        method: 'post',
        url: '/api/setups',
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      history.replace(`/setups/${data._id}`);
    } catch ({ response }) {
      console.log(response.data.message);
      setCreateSetupError(response.data.message);
    }
  });

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  console.log('Errors: ', errors);
  console.log(watch());

  return (
    <Container>
      <FormProvider {...methods}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create new setup
          </Typography>
          <form
            onSubmit={newSetupFormOnSubmit}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={3}>
              <Grid container item md={4} direction="column">
                <Grid item md={12}>
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
                        helperText={
                          errors.name?.message ? errors.name?.message : ''
                        }
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item md={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }): JSX.Element => (
                      <TextField
                        {...field}
                        variant="outlined"
                        margin="normal"
                        required
                        multiline
                        rowsMax={5}
                        fullWidth
                        id="description"
                        label="Description"
                        error={!!errors.description?.message}
                        helperText={
                          errors.description?.message
                            ? errors.description?.message
                            : ''
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container item md={8} justify="center">
                <input
                  {...register('screenshotImage')}
                  id="screenshotImage"
                  name="screenshotImage"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <label htmlFor="screenshotImage">
                  <Button
                    component="span"
                    variant="contained"
                    color="secondary"
                  >
                    Upload screenshot
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="New setup components"
                  variant="fullWidth"
                >
                  <Tab label="Main" {...a11yProps(0)} />
                  <Tab label="Attachments" {...a11yProps(1)} />
                  <Tab label="Syandana" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <NewSetupTabPanel value={value} index={0}>
                <Grid container>
                  <Grid item md={4}>
                    <NewSetupSetupSection
                      frames={frames}
                      helmets={helmets}
                      skins={skins}
                    />
                  </Grid>

                  <Grid item md={8}>
                    Colors
                    {/* <ColorSchemeSubsection
                  dataPrefix="colorScheme"
                  colorPickers={colorPickers}
                /> */}
                  </Grid>
                </Grid>
              </NewSetupTabPanel>
              <NewSetupTabPanel value={value} index={1}>
                <Grid container>
                  <Grid item md={4}>
                    <NewSetupAttachmentsSection
                      armAttachments={armAttachments}
                      chestAttachments={chestAttachments}
                      ephemeras={ephemeras}
                      legAttachments={legAttachments}
                    />
                  </Grid>

                  <Grid item md={8}>
                    Colors
                    {/* <ColorSchemeSubsection
dataPrefix="attachments.colorScheme"
colorPickers={colorPickers}
/> */}
                  </Grid>
                </Grid>
              </NewSetupTabPanel>
              <NewSetupTabPanel value={value} index={2}>
                <Grid container>
                  <Grid item md={4}>
                    <NewSetupSyandanaSection syandanas={syandanas} />
                  </Grid>

                  <Grid item md={8}>
                    Colors
                    {/* <ColorSchemeSubsection
                  dataPrefix="syandana.colorScheme"
                  colorPickers={colorPickers}
                /> */}
                  </Grid>
                </Grid>
              </NewSetupTabPanel>
            </Grid>
            <Grid item md={12} container justify="center">
              {createSetupError && <Error error={createSetupError} />}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Create
              </Button>
            </Grid>
          </form>
        </div>
      </FormProvider>
    </Container>
  );
};

export default NewSetupForm;
