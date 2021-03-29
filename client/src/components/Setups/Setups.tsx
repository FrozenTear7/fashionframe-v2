import axios from 'axios';
import * as React from 'react';
import { SetupItem } from '../../types/Setup';
import Loading from '../../utils/Loading';
import SetupListItem from './SetupListItem';

const Setups: React.VFC = () => {
  const [setups, setSetups] = React.useState<SetupItem[]>([]);
  const [setupsLoading, setSetupsLoading] = React.useState(false);
  const [setupsError, setSetupsError] = React.useState();

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
      setSetupsLoading(true);

      try {
        const setupsRes = await axios.get('http://localhost:3001/api/setups');
        console.log(setupsRes);
        setSetups(setupsRes.data.data);
      } catch (e) {
        console.log(e);
        setSetupsError(e);
      } finally {
        setSetupsLoading(false);
      }
    };

    void fetchSetups();
  }, []);

  // console.log(setups);

  if (setupsLoading) return <Loading />;
  if (setupsError) return <div>{setupsError}</div>;
  return (
    <div className="Setups">
      Setups
      <ul>
        {setups.length > 0 &&
          setups.map((setup) => (
            <li key={setup._id}>
              <SetupListItem
                _id={setup._id}
                author={setup.author}
                name={setup.name}
                frame={setup.frame}
                screenshot={setup.screenshot}
                createdAt={setup.createdAt}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Setups;
