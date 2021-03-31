import * as React from 'react';
import { SetupItem } from '../../types/Setup';

const SetupListItem: React.VFC<{ setup: SetupItem }> = ({ setup }) => {
  const {
    author,
    name,
    frame,
    screenshot,
    createdAt,
    likes,
    likedByYou,
  } = setup;

  return (
    <div className="SetupListItem">
      <div>name: {name}</div>
      <div>author: {author.username}</div>
      <div>frame: {frame}</div>
      <div>createdAt: {createdAt}</div>
      <div>screenshot: {screenshot}</div>
      <div>likes: {likes}</div>
      <div>likedByYou: {likedByYou}</div>
    </div>
  );
};

export default SetupListItem;
