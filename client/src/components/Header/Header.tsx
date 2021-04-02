import * as React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { signOut } from '../../utils/auth';
import { useUserContext } from '../../UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header: React.VFC = () => {
  const classes = useStyles();
  const { user, setUser } = useUserContext();

  return (
    <div className="Header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fashionframe
          </Typography>
          <Button color="inherit" component={Link} to="/setups">
            Setups
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/setups/create">
              New setup
            </Button>
          )}
          {user ? (
            <>
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  component={Link}
                  to="/profile"
                >
                  <AccountCircle />
                </IconButton>
                {user.username}
              </>
              <Button
                color="inherit"
                onClick={async (): Promise<void> => {
                  await signOut();
                  setUser(null);
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signin">
                Sign in
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
