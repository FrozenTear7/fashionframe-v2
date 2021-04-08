import { makeStyles, Theme } from '@material-ui/core/styles';

const useUserPageStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontSize: '2em',
    [theme.breakpoints.up('lg')]: {
      fontSize: '4em',
    },
  },
  subTitle: {
    fontSize: '1em',
    [theme.breakpoints.up('lg')]: {
      fontSize: '2em',
    },
  },
}));

export default useUserPageStyles;
