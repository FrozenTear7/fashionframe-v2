import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import { Badge } from '@material-ui/core';
import { SetupItem } from '../../types/Setup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

const SetupListItem: React.VFC<{ setup: SetupItem }> = ({ setup }) => {
  const classes = useStyles();

  const { name, frame, screenshot, likes } = setup;

  return (
    <Link to={`/setups/${setup._id}`}>
      <div className="SetupListItem">
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Screenshot" src={screenshot} variant="square" />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {frame}
                </Typography>
              </>
            }
          />
          <Badge color="secondary" badgeContent={likes} showZero>
            <StarIcon />
          </Badge>
        </ListItem>
      </div>
    </Link>
  );
};

export default SetupListItem;
