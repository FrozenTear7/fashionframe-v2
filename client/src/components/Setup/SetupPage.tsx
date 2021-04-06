import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useSetupPageStyles from './useSetupPageStyles';
import { SetupDetails } from '../../types/Setup';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const SetupTabPanel: React.VFC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`setup-tabpanel-${index}`}
      aria-labelledby={`setup-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

interface SetupDetailsProps {
  setup: SetupDetails;
}

const a11yProps = (index: number): { id: string; 'aria-controls': string } => {
  return {
    id: `setup-tab-${index}`,
    'aria-controls': `setup-tabpanel-${index}`,
  };
};

const SetupPage: React.VFC<SetupDetailsProps> = ({ setup }) => {
  const classes = useSetupPageStyles();

  const [currentTab, setCurrentTab] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const {
    name,
    description,
    frame,
    helmet,
    skin,
    screenshot,
    attachments,
    syandana,
    // colorScheme,
  } = setup;

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Grid container justify="center" alignItems="flex-start">
      <Grid container item lg={6} direction="column">
        <Grid item xs>
          <Typography className={classes.title} component="h1">
            {name}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography className={classes.subTitle} component="h2">
            {description || 'No description'}
          </Typography>
        </Grid>
        <Grid container item xs justify="center">
          <Button onClick={(): void => setOpen(true)}>
            <img
              className={classes.screenshot}
              alt="Screenshot"
              src={screenshot}
            />
          </Button>
          <Dialog
            open={open}
            onClose={(): void => setOpen(false)}
            fullScreen
            aria-labelledby="screenshot-dialog"
            aria-describedby="screenshot-dialog-description"
          >
            <DialogContent dividers style={{ display: 'flex' }}>
              <Grid container justify="center" alignItems="center">
                <Button onClick={(): void => setOpen(false)}>
                  <img
                    alt="Screenshot"
                    className={classes.screenshotDialog}
                    src={screenshot}
                  />
                </Button>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={(): void => setOpen(false)} color="primary">
                Exit
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <Grid item lg={6}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={currentTab}
            onChange={(
              _event: React.ChangeEvent<unknown>,
              newValue: number
            ): void => {
              setCurrentTab(newValue);
            }}
            aria-label="Setup components"
            variant="fullWidth"
          >
            <Tab wrapped label="Main" {...a11yProps(0)} />
            <Tab wrapped label="Attachments" {...a11yProps(1)} />
            <Tab wrapped label="Syandana" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SetupTabPanel value={currentTab} index={0}>
          <Grid container>
            <Grid container item lg={6} spacing={3} direction="column">
              <Grid item>
                <Typography variant="body1" component="p">
                  Frame
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{frame}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Helmet
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{helmet}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Skin
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{skin}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={6}>
              Colors
            </Grid>
          </Grid>
        </SetupTabPanel>
        <SetupTabPanel value={currentTab} index={1}>
          <Grid container>
            <Grid container item lg={6} spacing={3} direction="column">
              <Grid item>
                <Typography variant="body1" component="p">
                  Chest
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{attachments.chest}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Left arm
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{attachments.leftArm}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Right arm
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{attachments.rightArm}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Left leg
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{attachments.leftLeg}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Right leg
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{attachments.rightLeg}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Ephemera
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{attachments.ephemera}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={6}>
              Colors
            </Grid>
          </Grid>
        </SetupTabPanel>
        <SetupTabPanel value={currentTab} index={2}>
          <Grid container>
            <Grid container item lg={6} spacing={3} direction="column">
              <Grid item>
                <Typography variant="body1" component="p">
                  Syandana
                </Typography>
                <Typography variant="h5" component="p">
                  <strong>{syandana.name}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={6}>
              Colors
            </Grid>
          </Grid>
        </SetupTabPanel>
      </Grid>
    </Grid>
  );
};

export default SetupPage;
