import { makeStyles, Theme } from '@material-ui/core/styles';

const useAboutStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontSize: '3em',
    [theme.breakpoints.up('md')]: {
      fontSize: '6em',
    },
  },
  subTitle: {
    fontSize: '2em',
    [theme.breakpoints.up('md')]: {
      fontSize: '3em',
    },
  },
  titleDivider: {
    marginBlock: '2rem',
  },
}));

export default useAboutStyles;
