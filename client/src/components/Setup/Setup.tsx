import * as React from 'react';
import { RouteComponentProps } from 'react-router';

const Setup: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const setupId = match.params.id;

  return <div className="Setup">Setup {setupId}</div>;
};

export default Setup;
