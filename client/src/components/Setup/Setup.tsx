import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router';
import { SetupDetails } from '../../types/Setup';
import Error from '../../utils/Error';
import Loading from '../../utils/Loading';

const Setup: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const setupId = match.params.id;

  const [setup, setSetup] = React.useState<SetupDetails>();
  const [setupLoading, setSetupLoading] = React.useState(true);
  const [setupError, setSetupError] = React.useState<string>();

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
      setSetupError(undefined);
      setSetupLoading(true);

      try {
        const { data } = await axios.get(`/api/setups/${setupId}`);
        setSetup(data);
      } catch ({ response }) {
        setSetupError(response.data.message);
      } finally {
        setSetupLoading(false);
      }
    };

    void fetchSetups();
  }, []);

  if (setupLoading) return <Loading />;
  if (setupError) return <Error error={setupError} />;
  return (
    <div className="Setup">
      <Helmet>
        <title>
          {setup
            ? `${String(setup.name).substr(0, 50)} | ${String(
                setup.frame
              )} | Fashionframe`
            : 'Fashionframe'}
        </title>
        <meta name="description" content="DESCRIPTION" />
      </Helmet>
      Setup {setupId}
      Name: {setup?.name}
    </div>
  );
};

export default Setup;
