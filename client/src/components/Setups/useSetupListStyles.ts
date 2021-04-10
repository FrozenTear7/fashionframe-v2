import { makeStyles, Theme } from '@material-ui/core/styles';

const useSetupListStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  starIcon: {
    color: theme.palette.primary.light,
  },
  gridList: {
    // maxWidth: '70vw',
    // height: 450,
  },
}));

export default useSetupListStyles;
