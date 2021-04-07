import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router-dom';
import { GetRequestGeneric } from '../../types';
import { SetupDetails } from '../../types/Setup';
import { ColorPickers } from '../../types/WarframeData';
import useAxiosGet from '../requests/useAxiosGet';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
import SetupPage from './SetupPage';

interface AxiosGetSetup extends GetRequestGeneric {
  data: SetupDetails;
}

interface AxiosGetColorPickers extends GetRequestGeneric {
  data: ColorPickers;
}

const Setup: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const setupId = match.params.id;

  const {
    data: setup,
    loading: setupLoading,
    error: setupError,
  }: AxiosGetSetup = useAxiosGet(`/api/setups/${setupId}`);
  const {
    data: colorPickers,
    loading: colorPickersLoading,
    error: colorPickersError,
  }: AxiosGetColorPickers = useAxiosGet(`/api/data/colorPickers`);

  if (setupLoading || colorPickersLoading) return <Loading />;
  if (setupError) return <Error error={setupError} />;
  if (colorPickersError) return <Error error={colorPickersError} />;
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
