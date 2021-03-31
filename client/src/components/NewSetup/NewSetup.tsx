/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { WarframeData } from '../../types/WarframeData';
import Error from '../../utils/Error';
import Loading from '../../utils/Loading';

const NewSetup: React.VFC = () => {
  const [warframeData, setWarframeData] = React.useState<WarframeData>();
  const [warframeDataLoading, setWarframeDataLoading] = React.useState(true);
  const [warframeDataError, setWarframeDataError] = React.useState<string>();
  const [createSetupError] = React.useState<string>();
  // const [selectedFrame, setSelectedFrame] = React.useState<string>('Ash');

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

  //   const setupFormOnSubmit = async (
  //     name: string,
  //     description: string,
  //     screenshotImage: File | string
  //   ): Promise<void> => {
  //     const setup = {
  //       name,
  //       description,
  //     };

  //     // Can't figure out how to pass screenshotImage value correctly so it has to asserted this way for now
  //     const bodyFormData = new FormData();
  //     bodyFormData.append('screenshotImage', screenshotImage);
  //     bodyFormData.append('setup', JSON.stringify(setup));

  //     try {
  //       console.log('xddd');
  //       console.log(bodyFormData);
  //       await axios({
  //         method: 'post',
  //         url: '/api/setups',
  //         data: bodyFormData,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //     } catch ({ response }) {
  //       console.log(response);
  //       setCreateSetupError(response.data.message);
  //     }
  //   };

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
      <div className="SignInForm">
        {createSetupError && <Error error={createSetupError} />}
      </div>
    </div>
  );
};

export default NewSetup;
