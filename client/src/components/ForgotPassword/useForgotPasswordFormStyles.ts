import { makeStyles, Theme } from '@material-ui/core/styles';

const useForgotPasswordFormStyles = makeStyles<Theme>((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
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
}));

export default useForgotPasswordFormStyles;
