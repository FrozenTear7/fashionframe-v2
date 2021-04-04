import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface ListItemLinkProps {
  to: string;
  name: string;
  children: React.ReactNode;
}

const ListItemLink: React.VFC<ListItemLinkProps> = ({ to, name, children }) => {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default ListItemLink;
