/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SetupItem } from '../../types/Setup';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
import SetupListItem from './SetupListItem';

const Setups: React.VFC = () => {
  const [setups, setSetups] = React.useState<SetupItem[]>([]);
  const [setupsLoading, setSetupsLoading] = React.useState(true);
  const [setupsError, setSetupsError] = React.useState<string>();

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
      setSetupsError(undefined);
      setSetupsLoading(true);

      try {
        const { data } = await axios.get('/api/setups');
        setSetups(data);
      } catch ({ response }) {
        setSetupsError(response.data.message);
      } finally {
        setSetupsLoading(false);
      }
    };

    void fetchSetups();
  }, []);

  if (setupsLoading) return <Loading />;
  if (setupsError) return <Error error={setupsError} />;
  return (
    <div className="Setups">
      <Helmet>
        <title>Fashion setups | Fashionframe</title>
        <meta
          name="description"
          content="Search for fashion setups created by other players, filter by frames or popularity."
        />
      </Helmet>
      Setups
      <ul>
        {setups.length > 0 &&
          setups.map((setup) => (
            <li key={setup._id}>
              <Link to={`/setups/${setup._id}`}>
                <SetupListItem setup={setup} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Setups;
