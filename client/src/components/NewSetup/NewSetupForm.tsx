import axios, { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import { WarframeData } from '../../types/WarframeData';
import Error from '../Utils/Error';
import newSetupSchema from '../../validation/newSetupSchema';
import { NewSetupFormData } from '../../types/Setup';
import NewSetupMainSection from './NewSetupMainSection';
import NewSetupSyandanaSection from './NewSetupSyandanaSection';
import NewSetupAttachmentsSection from './NewSetupAttachmentsSections';
import NewSetupTabPanel from './NewSetupTabPanel';
import useNewSetupFormStyles from './useNewSetupFormStyles';
import ColorSchemeSubsection from './ColorSchemeSubsection';
import a11yProps from '../../utils/a11yProps';
import NewSetupTopSection from './NewSetupTopSection';

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
    frameSpecific: 'None',
  },
  syandana: {
    name: 'None',
  },
};

const NewSetupForm: React.VFC<{ warframeData: WarframeData }> = ({
  warframeData,
}) => {
  const history = useHistory();
  const classes = useNewSetupFormStyles();

  const [createSetupLoading, setCreateSetupLoading] = React.useState(false);
  const [createSetupError, setCreateSetupError] = React.useState<AxiosError>();
  const [currentTab, setCurrentTab] = React.useState(0);

  const {
    frames,
    helmets,
    skins,
    chestAttachments,
    armAttachments,
    legAttachments,
    ephemeras,
    syandanas,
    colorPickers,
    frameSpecific,
  } = warframeData;

  const methods = useForm<NewSetupFormData>({
    resolver: yupResolver(newSetupSchema),
    defaultValues: newSetupFormDefaultValues,
  });
  const { handleSubmit } = methods;

  const newSetupFormOnSubmit = handleSubmit(async (setupWithImage) => {
    setCreateSetupError(undefined);
    setCreateSetupLoading(true);

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
    } catch (error) {
      setCreateSetupError(error);
      setCreateSetupLoading(false);
    }
  });

  return (
    <Container component="main" maxWidth="xl">
      <FormProvider {...methods}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            New fashion setup
          </Typography>
          <form
            onSubmit={newSetupFormOnSubmit}
            className={classes.form}
            noValidate
          >
            <Grid item container justify="center">
              <Grid item>
                {createSetupError && <Error error={createSetupError} />}
              </Grid>
              <Grid container item justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={createSetupLoading}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <NewSetupTopSection />
            </Grid>
            <Grid item md={12}>
              <AppBar position="static" className={classes.appBar}>
                <Tabs
                  value={currentTab}
                  onChange={(
                    _event: React.ChangeEvent<unknown>,
                    newValue: number
                  ): void => {
                    setCurrentTab(newValue);
                  }}
                  aria-label="New setup components"
                  variant="fullWidth"
                >
                  <Tab wrapped label="Main" {...a11yProps('newsetup', 0)} />
                  <Tab
                    wrapped
                    label="Attachments"
                    {...a11yProps('newsetup', 1)}
                  />
                  <Tab wrapped label="Syandana" {...a11yProps('newsetup', 2)} />
                </Tabs>
              </AppBar>
              <NewSetupTabPanel value={currentTab} index={0}>
                <Grid container spacing={2}>
                  <Grid item lg={4}>
                    <NewSetupMainSection
                      frames={frames}
                      helmets={helmets}
                      skins={skins}
                    />
                  </Grid>

                  <Grid item lg={8}>
                    <ColorSchemeSubsection
                      dataPrefix="colorScheme"
                      colorPickers={colorPickers}
                    />
                  </Grid>
                </Grid>
              </NewSetupTabPanel>
              <NewSetupTabPanel value={currentTab} index={1}>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <NewSetupAttachmentsSection
                      armAttachments={armAttachments}
                      chestAttachments={chestAttachments}
                      ephemeras={ephemeras}
                      legAttachments={legAttachments}
                      frameSpecific={frameSpecific}
                    />
                  </Grid>

                  <Grid item md={8}>
                    <ColorSchemeSubsection
                      dataPrefix="attachments.colorScheme"
                      colorPickers={colorPickers}
                    />
                  </Grid>
                </Grid>
              </NewSetupTabPanel>
              <NewSetupTabPanel value={currentTab} index={2}>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <NewSetupSyandanaSection syandanas={syandanas} />
                  </Grid>

                  <Grid item md={8}>
                    <ColorSchemeSubsection
                      dataPrefix="syandana.colorScheme"
                      colorPickers={colorPickers}
                    />
                  </Grid>
                </Grid>
              </NewSetupTabPanel>
            </Grid>
          </form>
        </div>
      </FormProvider>
    </Container>
  );
};

export default NewSetupForm;
