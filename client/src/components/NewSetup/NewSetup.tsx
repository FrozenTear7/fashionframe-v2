import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { WarframeData } from '../../types/WarframeData';
import Error from '../../utils/Error';
import Loading from '../../utils/Loading';

const NewSetup: React.VFC = () => {
  const [warframeData, setWarframeData] = React.useState<WarframeData>();
  const [warframeDataLoading, setWarframeDataLoading] = React.useState(false);
  const [warframeDataError, setWarframeDataError] = React.useState<string>();

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
      const warframeDataTypes = [
        'armAttachments',
        'chestAttachments',
        'colorPickers',
        'ephemeras',
        'frames',
        'helmets',
        'legAttachments',
        'skins',
        'syandanas',
      ];

      setWarframeDataError(undefined);
      setWarframeDataLoading(true);

      try {
        const warframeDataRes = await axios.all(
          warframeDataTypes.map((warframeDataType) =>
            axios.get(`/api/data/${warframeDataType}`)
          )
        );
        const warframeDataReduced = warframeDataRes.reduce((a, { data }) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return { ...a, ...data };
        }, {});
        console.log(warframeDataReduced);
        setWarframeData(warframeDataReduced as WarframeData);
      } catch ({ response }) {
        console.log(response);
        setWarframeDataError(response);
      } finally {
        setWarframeDataLoading(false);
      }
    };

    void fetchSetups();
  }, []);

  console.log('xd', warframeData);

  if (warframeDataLoading) return <Loading />;
  if (warframeDataError)
    return (
      <div>
        <Error error={warframeDataError} />
      </div>
    );
  return (
    <div className="Setup">
      <Helmet>
        <title>Create new setup | Fashionframe</title>
        <meta
          name="description"
          content="Create a new fashion setup to share it with others."
        />
      </Helmet>
      Create new setup
    </div>
  );
};

export default NewSetup;
