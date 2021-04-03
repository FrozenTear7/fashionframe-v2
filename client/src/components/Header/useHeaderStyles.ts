import { makeStyles, Theme } from '@material-ui/core/styles';

const useHeaderStyles = makeStyles<Theme>((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.primary.dark,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default useHeaderStyles;
