import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import { useSnackbar } from 'notistack';
import HomeIcon from '@material-ui/icons/Home';
import { Button } from '@material-ui/core';
import headerStyle from './useHeaderStyles';
import { useUserContext } from '../../UserContext';
import { signOut } from '../../utils/auth';

const Header: React.VFC = () => {
  const classes = headerStyle();
  const { user, setUser } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ): void => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <AppBar component="nav" position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          className={classes.drawer}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className={classes.drawerList}
          >
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
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItem>
              <ListItem button component={Link} to="/setups">
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Setups" />
              </ListItem>
              {user && (
                <>
                  <ListItem button component={Link} to="/setups/create">
                    <ListItemIcon>
                      <CreateNewFolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="New setup" />
                  </ListItem>

                  <ListItem button component={Link} to="/favorites">
                    <ListItemIcon>
                      <FolderSpecialIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                  </ListItem>
                </>
              )}
            </List>
            <Divider />
            <List>
              {user ? (
                <>
                  <ListItem button component={Link} to="/profile">
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={async (): Promise<void> => {
                      await signOut();
                      setUser(null);
                      enqueueSnackbar('Signed up successfully', {
                        variant: 'success',
                        autoHideDuration: 3000,
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'center',
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
                  <ListItem button component={Link} to="/signin">
                    <ListItemIcon>
                      <LockIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign in" />
                  </ListItem>
                  <ListItem button component={Link} to="/signup">
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign up" />
                  </ListItem>
                </>
              )}
            </List>
          </div>
        </Drawer>
        <Button color="inherit" component={Link} to="/">
          <Typography variant="h6" className={classes.title}>
            Fashionframe
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
