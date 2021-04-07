import { Button, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useSetupPageStyles from './useSetupPageStyles';
import { ColorScheme } from '../../types/ColorScheme';

interface SetupColorSchemeProps {
  colorScheme: ColorScheme;
}

const SetupColorScheme: React.VFC<SetupColorSchemeProps> = ({
  colorScheme,
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

  const setupColorSchemeButton = (
    colorName: string,
    color: string | undefined
  ): JSX.Element => {
    if (color) {
      const rgb = color.split('.')[3];

      return (
        <Button
          className={classes.colorSchemeButton}
          style={{ background: rgb }}
          onClick={(): void => {
            setCurrentColor(colorName);
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

  return (
    <Grid container spacing={2} direction="column">
      {currentColor && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="similar-colors-title"
          aria-describedby="similar-colors-description"
        >
          <DialogTitle id="similar-colors-title">
            Find closest colors to #FFFFFF
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="similar-colors-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              Colors
            </DialogContentText>
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
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          Primary
        </Grid>
        <Grid item md={12}>
          {setupColorSchemeButton('primary', primary)}
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          Secondary
        </Grid>
        <Grid item md={12}>
          {setupColorSchemeButton('secondary', secondary)}
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          Tertiary
        </Grid>
        <Grid item md={12}>
          {setupColorSchemeButton('tertiary', tertiary)}
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          Accents
        </Grid>
        <Grid item md={12}>
          {setupColorSchemeButton('accents', accents)}
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          Emmissive
        </Grid>
        <Grid item md={6}>
          {setupColorSchemeButton('emmissive1', emmissive1)}
        </Grid>
        <Grid item md={6}>
          {setupColorSchemeButton('emmissive2', emmissive2)}
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={1}
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12}>
          Energy
        </Grid>
        <Grid item md={6}>
          {setupColorSchemeButton('energy1', energy1)}
        </Grid>
        <Grid item md={6}>
          {setupColorSchemeButton('energy2', energy2)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SetupColorScheme;
