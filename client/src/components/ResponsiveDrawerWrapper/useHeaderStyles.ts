import { makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 180;

const useHeaderStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.light,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    paddingTop: '3rem',
  },
  drawerList: {
    background: theme.palette.secondary.light,
  },
}));

export default useHeaderStyles;
