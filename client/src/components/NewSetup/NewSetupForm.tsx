/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { WarframeData } from '../../types/WarframeData';
import Error from '../Utils/Error';
import newSetupSchema from '../../validation/newSetupSchema';
import { NewSetupFormData } from '../../types/Setup';
import NewSetupSetupSection from './NewSetupSetupSection';
import NewSetupSyandanaSection from './NewSetupSyandanaSection';
import NewSetupAttachmentsSection from './NewSetupAttachmentsSections';
import ColorSchemeSubsection from './ColorSchemeSubsection';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const NewSetupForm: React.VFC<{ warframeData: WarframeData }> = ({
  warframeData,
}) => {
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
  } = warframeData;
  const history = useHistory();

  const [createSetupError, setCreateSetupError] = React.useState<string>();

  const methods = useForm<NewSetupFormData>({
    shouldUnregister: false,
    resolver: yupResolver(newSetupSchema),
    defaultValues: {
      frame: 'Ash',
      helmet: 'Ash Helmet',
      skin: 'Ash Skin',
      attachments: {
        chest: '',
        leftArm: '',
        rightArm: '',
        leftLeg: '',
        rightLeg: '',
        ephemera: '',
      },
      syandana: {
        name: '',
      },
    },
  });
  const { handleSubmit, register, errors } = methods;

  const newSetupFormOnSubmit = handleSubmit(async (setupWithImage) => {
    console.log(setupWithImage);
    const { screenshotImage, ...setup } = setupWithImage;

    const bodyFormData = new FormData();
    bodyFormData.append('screenshotImage', screenshotImage);
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

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="NewSetupForm">
      {createSetupError && <Error error={createSetupError} />}

      <label>Name</label>
      <input name="name" ref={register} />
      <>{errors.name?.message}</>

      <label>Description</label>
      <textarea name="description" ref={register} />
      <>{errors.description?.message}</>

      <label>Screenshot</label>
      <input
        name="screenshotImage"
        type="file"
        accept="image/*"
        ref={register}
      />
      <>{(errors.screenshotImage as { message: string })?.message}</>

      <FormProvider {...methods}>
        <form onSubmit={newSetupFormOnSubmit}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <NewSetupSetupSection
                frames={frames}
                helmets={helmets}
                skins={skins}
              />

              <ColorSchemeSubsection
                dataPrefix="colorScheme"
                colorPickers={colorPickers}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <NewSetupAttachmentsSection
                armAttachments={armAttachments}
                chestAttachments={chestAttachments}
                ephemeras={ephemeras}
                legAttachments={legAttachments}
              />

              <ColorSchemeSubsection
                dataPrefix="attachments.colorScheme"
                colorPickers={colorPickers}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <NewSetupSyandanaSection syandanas={syandanas} />

              <ColorSchemeSubsection
                dataPrefix="syandana.colorScheme"
                colorPickers={colorPickers}
              />
            </TabPanel>
          </div>

          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default NewSetupForm;
