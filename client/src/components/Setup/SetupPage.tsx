import { AppBar, Button, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useSetupPageStyles from './useSetupPageStyles';
import { SetupDetails } from '../../types/Setup';
import SetupColorScheme from './SetupColorScheme';
import a11yProps from '../../utils/a11yProps';
import SetupTabPanel from './SetupTabPanel';
import { ColorPickers } from '../../types/WarframeData';

interface SetupDetailsProps {
  setup: SetupDetails;
  colorPickers: ColorPickers;
}

const SetupPage: React.VFC<SetupDetailsProps> = ({ setup, colorPickers }) => {
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
    colorScheme,
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

  const genericInfoGridItem = (
    itemName: string,
    itemValue: string | undefined
  ): JSX.Element => {
    return (
      <Grid item>
        <Typography variant="body1" component="p">
          {itemName}
        </Typography>
        <Typography variant="h5" component="p">
          <strong>{itemValue}</strong>
        </Typography>
      </Grid>
    );
  };

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
            <Tab wrapped label="Main" {...a11yProps('setup', 0)} />
            <Tab wrapped label="Attachments" {...a11yProps('setup', 1)} />
            <Tab wrapped label="Syandana" {...a11yProps('setup', 2)} />
          </Tabs>
        </AppBar>
        <SetupTabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid container item lg={6} spacing={3} direction="column">
              {genericInfoGridItem('Frame', frame)}
              {genericInfoGridItem('Helmet', helmet)}
              {genericInfoGridItem('Skin', skin)}
            </Grid>
            <Grid item lg={6}>
              <SetupColorScheme colorScheme={colorScheme} />
            </Grid>
          </Grid>
        </SetupTabPanel>
        <SetupTabPanel value={currentTab} index={1}>
          <Grid container spacing={3}>
            <Grid container item lg={6} spacing={3} direction="column">
              {genericInfoGridItem('Chest', attachments.chest)}
              {genericInfoGridItem('Left arm', attachments.leftArm)}
              {genericInfoGridItem('Right arm', attachments.rightArm)}
              {genericInfoGridItem('Left leg', attachments.leftLeg)}
              {genericInfoGridItem('Right leg', attachments.rightLeg)}
              {genericInfoGridItem('Ephemera', attachments.ephemera)}
            </Grid>
            <Grid item lg={6}>
              <SetupColorScheme colorScheme={attachments.colorScheme} />
            </Grid>
          </Grid>
        </SetupTabPanel>
        <SetupTabPanel value={currentTab} index={2}>
          <Grid container spacing={3}>
            <Grid container item lg={6} spacing={3} direction="column">
              {genericInfoGridItem('Syandana', syandana.name)}
            </Grid>
            <Grid item lg={6}>
              <SetupColorScheme colorScheme={syandana.colorScheme} />
            </Grid>
          </Grid>
        </SetupTabPanel>
      </Grid>
    </Grid>
  );
};

export default SetupPage;
