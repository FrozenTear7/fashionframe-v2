import { makeStyles, Theme } from '@material-ui/core/styles';

const useNewSetupFormStyles = makeStyles<Theme>((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  screenshotImage: {
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
    maxHeight: 'calc(30vw * 9/16 + 30vh * 9/16)',
    // minWidth: 250,
    // minHeight: 250,
  },
  appBar: {
    marginTop: theme.spacing(3),
  },
  screenshotImageError: {
    color: theme.palette.error.main,
  },
  selectedColorTitle: {
    fontSize: '1.5em',
    color: theme.palette.primary.dark,
  },
}));

export default useNewSetupFormStyles;
