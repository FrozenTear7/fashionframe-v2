import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Route, Switch, useLocation } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import { useSnackbar } from 'notistack';
import InfoIcon from '@material-ui/icons/Info';
import { PrivateRoute, SignedInRoute } from '../../utils/PrivateRoute';
import Setup from '../Setup/Setup';
import Setups from '../Setups/Setups';
import User from '../User/User';
import NewSetup from '../NewSetup/NewSetup';
import Homepage from '../Homepage/Homepage';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import NotFound from '../Utils/NotFound';
import { signOut } from '../../utils/auth';
import ListItemLink from './ListItemLink';
import useResponsiveDrawerWrapperStyles from './useResponsiveDrawerWrapperStyles';
import { useUserContext } from '../../UserContext';
import About from '../About/About';

interface ResponsiveDrawerProps {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
}

const ResponsiveDrawerWrapper: React.VFC = (props: ResponsiveDrawerProps) => {
  const classes = useResponsiveDrawerWrapperStyles();
  const { user, setUser } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { window } = props;

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const container: (() => HTMLElement) | undefined =
    window !== undefined
      ? (): HTMLElement => window().document.body
      : undefined;

  const drawer = (
    <>
      <div className={classes.toolbar} />
      {user && (
        <>
          <List>
            <ListItem>
              <ListItemText>Signed in as:</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <strong>{user?.username.substr(0, 15)}</strong>
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      <List>
        <ListItemLink to="/" name="Homepage">
          <HomeIcon />
        </ListItemLink>
        <ListItemLink to="/setups" name="Setups">
          <FolderIcon />
        </ListItemLink>
        {user && (
          <>
            <ListItemLink to="/setups/create" name="New setup">
              <CreateNewFolderIcon />
            </ListItemLink>
            <ListItemLink to="/favorites" name="Favorites">
              <FolderSpecialIcon />
            </ListItemLink>
          </>
        )}
      </List>
      <Divider />
      <ListItemLink to="/about" name="About">
        <InfoIcon />
      </ListItemLink>
      <Divider />
      <List>
        {user ? (
          <>
            <ListItemLink to="/profile" name="Profile">
              <AccountCircle />
            </ListItemLink>
            <ListItem
              button
              onClick={async (): Promise<void> => {
                await signOut();
                setUser(null);
                enqueueSnackbar('Signed out successfully', {
                  variant: 'success',
                  autoHideDuration: 3000,
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                });
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItemLink to="/signin" name="Sign in">
              <LockIcon />
            </ListItemLink>
            <ListItemLink to="/signup" name="Sign Up">
              <PersonAddIcon />
            </ListItemLink>
          </>
        )}
      </List>
    </>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            Fashionframe
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="side menu">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="xl" className={classes.container}>
          <Switch location={location}>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/about" component={About} />
            <SignedInRoute exact path="/signup" component={SignUp} />
            <SignedInRoute exact path="/signin" component={SignIn} />
            <Route exact path="/setups" component={Setups} />
            <PrivateRoute exact path="/setups/create" component={NewSetup} />
            <Route exact path="/setups/:id" component={Setup} />
            <PrivateRoute path="/profile" component={User} />
            <Route exact path="/user/:id" component={User} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
    </div>
  );
};

export default ResponsiveDrawerWrapper;
