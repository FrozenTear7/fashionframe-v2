import { makeStyles, Theme } from '@material-ui/core/styles';

const useSetupListStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  tileBar: {
    backgroundColor: theme.palette.primary.dark,
    opacity: 0.75,
  },
  starIcon: {
    color: theme.palette.primary.light,
  },
}));

export default useSetupListStyles;
