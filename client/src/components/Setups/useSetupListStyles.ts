import { makeStyles, Theme } from '@material-ui/core/styles';

const useSetupListStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  starIcon: {
    color: theme.palette.primary.light,
  },
}));

export default useSetupListStyles;
