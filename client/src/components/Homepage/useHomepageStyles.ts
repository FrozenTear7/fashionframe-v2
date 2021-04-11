import { makeStyles, Theme } from '@material-ui/core/styles';

const useHomepageStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontSize: '3em',
    [theme.breakpoints.up('md')]: {
      fontSize: '6em',
    },
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  subTitle: {
    fontSize: '1.5em',
    [theme.breakpoints.up('md')]: {
      fontSize: '3em',
    },
    color: 'white',
  },
  exploreButton: {
    color: 'white',
    fontSize: '1.5em',
    [theme.breakpoints.up('md')]: {
      fontSize: '2em',
    },
  },
  videoContainer: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backgroundVideo: {
    zIndex: -1,
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    minWidth: '100%',
    minHeight: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  mainContainer: {
    marginTop: '35vh',
    padding: theme.spacing(2),
    background: 'rgba(1, 1, 1, 0.7)',
    borderRadius: 8,
  },
}));

export default useHomepageStyles;
