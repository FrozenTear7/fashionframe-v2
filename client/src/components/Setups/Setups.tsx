import axios from 'axios';
import * as React from 'react';

const Setups: React.VFC = () => {
  const [setups, setSetups] = React.useState([]);

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
      const setupsRes = await axios.get('http://localhost:3001/api/setups');
      setSetups(setupsRes.data);
    };

    // eslint-disable-next-line no-void
    void fetchSetups();
  });

  console.log(setups);

  return <div className="Setups">Setups</div>;
};

export default Setups;
