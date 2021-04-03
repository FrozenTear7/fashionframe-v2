import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { SetupItem } from '../../types/Setup';
import useWidth from '../../utils/useWidth';

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
  const width = useWidth();

  return (
    <GridList cellHeight={300} cols={howManyCols(width)}>
      {setups.length > 0 &&
        setups.map(({ _id, name, frame, screenshot, likes, author }) => (
          <GridListTile key={_id} component={Link} to={`/setups/${_id}`}>
            <img src={screenshot} alt={name} />
            <GridListTileBar
              title={name}
              subtitle={
                <span>
                  Frame: {frame}, created by: {author.username}
                </span>
              }
              actionIcon={
                <Badge
                  color="secondary"
                  badgeContent={likes}
                  showZero
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <StarBorderIcon />
                </Badge>
              }
            />
          </GridListTile>
        ))}
    </GridList>
  );
};

export default SetupList;
