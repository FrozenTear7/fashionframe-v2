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
    width: 'auto',
    height: '100%',
    maxHeight: 'calc(30vw * 9/16 + 30vh * 9/16)',
  },
  appBar: {
    marginTop: theme.spacing(3),
  },
}));

export default useNewSetupFormStyles;
