import * as React from 'react';
import { SetupItem } from '../../types/Setup';

const SetupListItem: React.VFC<SetupItem> = ({
  author,
  name,
  frame,
  screenshot,
  createdAt,
}) => {
  return (
    <div className="SetupListItem">
      <div>name: {name}</div>
      <div>author: {author.username}</div>
      <div>frame: {frame}</div>
      <div>createdAt: {createdAt}</div>
      <div>screenshot: {screenshot}</div>
    </div>
  );
};

export default SetupListItem;
