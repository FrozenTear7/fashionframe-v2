import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Alert, AlertTitle } from '@material-ui/lab';
import { SetupItem } from '../../types/Setup';
import useWidth from '../../utils/useWidth';
import useSetupListStyles from './useSetupListStyles';

interface SetupListItemProps {
  setups: SetupItem[];
}

const howManyCols = (width: Breakpoint): number => {
  switch (width) {
    case 'lg':
    case 'xl':
      return 3;
    case 'md':
      return 2;
    default:
      return 1;
  }
};

const SetupList: React.VFC<SetupListItemProps> = ({ setups }) => {
  const classes = useSetupListStyles();
  const width = useWidth();

  return (
    <div className={classes.root}>
      {setups.length > 0 ? (
        <GridList cellHeight={300} cols={howManyCols(width)}>
          {setups.map(({ _id, name, frame, screenshot, score, author }) => (
            <GridListTile key={_id} component={Link} to={`/setups/${_id}`}>
              <img src={screenshot} alt={name} />
              <GridListTileBar
                title={name}
                className={classes.tileBar}
                subtitle={
                  <span>
                    Frame: {frame}, created by: {author.username}
                  </span>
                }
                actionIcon={
                  <Badge
                    color="secondary"
                    badgeContent={score}
                    showZero
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <StarIcon className={classes.starIcon} />
                  </Badge>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      ) : (
        <Container component="main" maxWidth="md">
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <strong>Could not find any fashion setups</strong>
          </Alert>
        </Container>
      )}
    </div>
  );
};

export default SetupList;
