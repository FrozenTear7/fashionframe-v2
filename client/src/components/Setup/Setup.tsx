import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { SetupDetails } from '../../types/Setup';
import { ColorPickers } from '../../types/WarframeData';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
import SetupPage from './SetupPage';

const Setup: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { id: setupId } = match.params;

  const [
    { data: setup, loading: setupLoading, error: setupError },
    fetchSetup,
  ] = useAxios<SetupDetails, string>(`/api/setups/${setupId}`);
  const [
    {
      data: colorPickers,
      loading: colorPickersLoading,
      error: colorPickersError,
    },
  ] = useAxios<{ colorPickers: ColorPickers }, string>(
    '/api/data/colorPickers'
  );

  React.useEffect(() => {
    void fetchSetup();
  }, []);

  if (setupLoading || colorPickersLoading) return <Loading />;
  if (setupError) return <Error error={setupError.message} />;
  if (colorPickersError) return <Error error={colorPickersError.message} />;
  if (!setup || !colorPickers) return <Error error="Something went wrong" />;
  return (
    <>
      <Helmet>
        <title>
          {setup
            ? `${String(setup.name).substr(0, 30)} | ${String(
                setup.frame
              )} | Fashionframe`
            : 'Fashionframe'}
        </title>
        <meta name="description" content={setup.description} />
      </Helmet>
      <SetupPage setup={setup} colorPickers={colorPickers.colorPickers} />
    </>
  );
};

export default Setup;
