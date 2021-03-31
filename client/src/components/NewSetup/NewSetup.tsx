import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { WarframeData } from '../../types/WarframeData';
import Error from '../../utils/Error';
import Loading from '../../utils/Loading';
import NewSetupForm from './NewSetupForm';

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

const NewSetup: React.VFC = () => {
  const [warframeData, setWarframeData] = React.useState<WarframeData>();
  const [warframeDataLoading, setWarframeDataLoading] = React.useState(true);
  const [warframeDataError, setWarframeDataError] = React.useState<string>();

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
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
        setWarframeData(warframeDataReduced as WarframeData);
      } catch ({ response }) {
        console.log(response.data.message);
        setWarframeDataError(response.data.message);
      } finally {
        setWarframeDataLoading(false);
      }
    };

    void fetchSetups();
  }, []);

  if (warframeDataLoading) return <Loading />;
  if (warframeDataError) return <Error error={warframeDataError} />;
  if (!warframeData) return <Error error="Something went wrong" />;
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
      <NewSetupForm warframeData={warframeData} />
    </div>
  );
};

export default NewSetup;