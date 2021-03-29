import * as React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router';

const Setup: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const setupId = match.params.id;

  return (
    <div className="Setup">
      <Helmet>
        <title>SETUP NAME | FRAME | Fashionframe</title>
        <meta name="description" content="DESCRIPTION" />
      </Helmet>
      Setup {setupId}
    </div>
  );
};

export default Setup;
