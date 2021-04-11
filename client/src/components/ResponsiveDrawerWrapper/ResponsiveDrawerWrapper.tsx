import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Container } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import useResponsiveDrawerWrapperStyles from './useResponsiveDrawerWrapperStyles';
import DrawerContent from './DrawerContent';
import AppSwitch from './AppSwitch';
import Homepage from '../Homepage/Homepage';

interface ResponsiveDrawerProps {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
}

const ResponsiveDrawerWrapper: React.VFC = (props: ResponsiveDrawerProps) => {
  const classes = useResponsiveDrawerWrapperStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { window } = props;

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const container: (() => HTMLElement) | undefined =
    window !== undefined
      ? (): HTMLElement => window().document.body
      : undefined;

  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="*">
          <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar variant="dense">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Button component={Link} to="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/favicon-32x32.png`}
                    alt="Logo"
                  />
                </Button>
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
                  <DrawerContent />
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
                  <DrawerContent />
                </Drawer>
              </Hidden>
            </nav>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Container maxWidth="xl" className={classes.container}>
                <AppSwitch />
              </Container>
            </main>
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default ResponsiveDrawerWrapper;
