import { makeStyles, Theme } from '@material-ui/core/styles';

const useAPIPageStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontSize: '3em',
    [theme.breakpoints.up('md')]: {
      fontSize: '6em',
    },
  },
  subTitle: {
    fontSize: '1.5em',
    [theme.breakpoints.up('md')]: {
      fontSize: '2em',
    },
  },
  titleDivider: {
    marginBlock: '2rem',
  },
}));

export default useAPIPageStyles;
