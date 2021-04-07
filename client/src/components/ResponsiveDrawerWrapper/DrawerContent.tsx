import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import BuildIcon from '@material-ui/icons/Build';
import axios from 'axios';
import ListItemLink from './ListItemLink';
import useResponsiveDrawerWrapperStyles from './useResponsiveDrawerWrapperStyles';
import { useUserContext } from '../../UserContext';

const DrawerContent: React.VFC = () => {
  const classes = useResponsiveDrawerWrapperStyles();
  const { user, setUser } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const [signOutLoading, setSignOutLoading] = React.useState(false);

  const signOut = async (): Promise<void> => {
    setSignOutLoading(true);

    try {
      await axios.post('/api/users/logout');
      setUser(null);
      enqueueSnackbar('Signed out successfully', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    } catch ({ response }) {
      enqueueSnackbar(response.data.message, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    } finally {
      setSignOutLoading(false);
    }
  };

  return (
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
      <ListItemLink to="/about-api" name="API">
        <BuildIcon />
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
              }}
              disabled={signOutLoading}
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
};

export default DrawerContent;
