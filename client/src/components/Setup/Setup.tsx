import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router-dom';
import { SetupDetails } from '../../types/Setup';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
import SetupPage from './SetupPage';

const Setup: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const setupId = match.params.id;

  const [setup, setSetup] = React.useState<SetupDetails>();
  const [setupLoading, setSetupLoading] = React.useState(true);
  const [setupError, setSetupError] = React.useState<string>();

  const [colorPickers, setColorPickers] = React.useState<{
    [colorPicker: string]: string[];
  }>();
  const [colorPickersLoading, setColorPickersLoading] = React.useState(true);
  const [colorPickersError, setColorPickersError] = React.useState<string>();

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

    const fetchColorPickers = async (): Promise<void> => {
      setColorPickersError(undefined);
      setColorPickersLoading(true);

      try {
        const { data } = await axios.get(`/api/data/colorPickers`);
        setColorPickers(data);
      } catch ({ response }) {
        setColorPickersError(response.data.message);
      } finally {
        setColorPickersLoading(false);
      }
    };

    void fetchSetups();
    void fetchColorPickers();
  }, []);

  console.log(setup);

  if (setupLoading || colorPickersLoading) return <Loading />;
  if (setupError) return <Error error={setupError} />;
  if (colorPickersError) return <Error error={colorPickersError} />;
  if (!setup || !colorPickers) return <Error error="Something went wrong" />;
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
      <SetupPage setup={setup} colorPickers={colorPickers} />
    </div>
  );
};

export default Setup;
