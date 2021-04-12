import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { WarframeData } from '../../types/WarframeData';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
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
  'frameSpecific',
];

const NewSetup: React.VFC = () => {
  const [warframeData, setWarframeData] = React.useState<WarframeData>();
  const [warframeDataLoading, setWarframeDataLoading] = React.useState(true);
  const [
    warframeDataError,
    setWarframeDataError,
  ] = React.useState<AxiosError>();

  React.useEffect(() => {
    let mounted = true;

    const fetchSetups = async (): Promise<void> => {
      if (mounted) {
        setWarframeDataError(undefined);
        setWarframeDataLoading(true);
      }

      try {
        // Multi-fetch on all data types
        const warframeDataRes = await axios.all(
          warframeDataTypes.map((warframeDataType) =>
            axios.get(`/api/data/${warframeDataType}`)
          )
        );
        const warframeDataReduced = warframeDataRes.reduce((acc, { data }) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return { ...acc, ...data };
        }, {});
        if (mounted) setWarframeData(warframeDataReduced as WarframeData);
      } catch (error) {
        if (mounted) setWarframeDataError(error);
      } finally {
        if (mounted) setWarframeDataLoading(false);
      }
    };

    void fetchSetups();

    return (): void => {
      mounted = false;
    };
  }, []);

  if (warframeDataLoading) return <Loading />;
  if (warframeDataError) return <Error error={warframeDataError} />;
  if (!warframeData) return <Error error="Something went wrong" />;
  return (
    <>
      <Helmet>
        <title>Create new setup | Fashionframe</title>
        <meta
          name="description"
          content="Create a new fashion setup to share it with others. Choose your attachments and colors using a custom simulated in-game color picker."
        />
        <meta
          name="keywords"
          content="fashionframe, warframe, fashion, setup, setups, create, color, colors, colorpicker, picker, social, hub, sharing"
        />
      </Helmet>
      <NewSetupForm warframeData={warframeData} />
    </>
  );
};

export default NewSetup;
