import { Button, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useSetupPageStyles from './useSetupPageStyles';
import { ColorScheme } from '../../types/ColorScheme';
import capitalize from '../../utils/capitalize';
import SetupDialogColors from './SetupDialogColors';
import { ColorPickers } from '../../types/WarframeData';

interface SetupColorSchemeProps {
  colorScheme: ColorScheme;
  colorPickers: ColorPickers;
}

const SetupColorScheme: React.VFC<SetupColorSchemeProps> = ({
  colorScheme,
  colorPickers,
}) => {
  const classes = useSetupPageStyles();

  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState<string | null>(null);

  const {
    primary,
    secondary,
    tertiary,
    accents,
    emmissive1,
    emmissive2,
    energy1,
    energy2,
  } = colorScheme;

  const setupColorSchemeButton = (color: string | undefined): JSX.Element => {
    if (color) {
      const rgb = color.split('.')[3];

      return (
        <Button
          className={classes.colorSchemeButton}
          style={{ background: rgb }}
          onClick={(): void => {
            setCurrentColor(rgb);
            setOpen(true);
          }}
        />
      );
    }

    return <Button className={classes.colorSchemeButtonCheckered} disabled />;
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) descriptionElement.focus();
    }
  }, [open]);

  const singleColorItem = (
    colorName: string,
    color: string | undefined
  ): JSX.Element => {
    return (
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          {capitalize(colorName)}
        </Grid>
        <Grid item md={12}>
          {setupColorSchemeButton(color)}
        </Grid>
      </Grid>
    );
  };

  const doubleColorItem = (
    colorName: string,
    color1: string | undefined,
    color2: string | undefined
  ): JSX.Element => {
    return (
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          {capitalize(colorName)}
        </Grid>
        <Grid item md={6}>
          {setupColorSchemeButton(color1)}
        </Grid>
        <Grid item md={6}>
          {setupColorSchemeButton(color2)}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} direction="column">
      {currentColor && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="similar-colors-title"
          aria-describedby="similar-colors-description"
        >
          <DialogTitle id="similar-colors-title">
            <Grid container>
              <Grid item>Similar to&nbsp;</Grid>
              <Grid item>
                <div
                  className={classes.colorSchemeButton}
                  style={{ background: currentColor }}
                />
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <SetupDialogColors
              colorPickers={colorPickers}
              currentColor={currentColor}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Typography variant="h5" component="p">
        Color scheme
      </Typography>
      {singleColorItem('primary', primary)}
      {singleColorItem('secondary', secondary)}
      {singleColorItem('tertiary', tertiary)}
      {singleColorItem('accents', accents)}
      {doubleColorItem('emmissive', emmissive1, emmissive2)}
      {doubleColorItem('energy', energy1, energy2)}
    </Grid>
  );
};

export default SetupColorScheme;
