/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { WarframeData } from '../../types/WarframeData';
import Error from '../../utils/Error';
import Loading from '../../utils/Loading';
import newSetupSchema from '../../validation/newSetupSchema';

type NewSetupFormData = {
  name: string;
  description: string;
  frame: string;
  helmet: string;
};

const NewSetup: React.VFC = () => {
  const history = useHistory();

  const [warframeData, setWarframeData] = React.useState<WarframeData>();
  const [warframeDataLoading, setWarframeDataLoading] = React.useState(true);
  const [warframeDataError, setWarframeDataError] = React.useState<string>();
  const [createSetupError, setCreateSetupError] = React.useState<string>();
  // const [selectedFrame, setSelectedFrame] = React.useState<string>('Ash');

  const {
    register,
    handleSubmit,
    errors,
    getValues,
  } = useForm<NewSetupFormData>({
    resolver: yupResolver(newSetupSchema),
    defaultValues: {
      frame: 'Ash',
    },
  });

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

  const newSetupFormOnSubmit = handleSubmit(
    async ({ name, description, frame, helmet }) => {
      const setup = {
        name,
        description,
        frame,
        helmet,
      };

      console.log(name, description, frame, helmet);

      const bodyFormData = new FormData();
      // bodyFormData.append('screenshotImage', screenshotImage);
      bodyFormData.append('setup', JSON.stringify(setup));

      try {
        const { data } = await axios({
          method: 'post',
          url: '/api/setups',
          data: bodyFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        history.replace(`/setups/${data._id}`);
      } catch ({ response }) {
        console.log(response.data.message);
        setCreateSetupError(response.data.message);
      }
    }
  );

  console.log(warframeData?.helmets[getValues('frame')]);

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

        <form onSubmit={newSetupFormOnSubmit}>
          <label>Name</label>
          <input name="name" ref={register} />
          <p>{errors.name?.message}</p>
          <label>Description</label>
          <textarea name="description" ref={register} />
          <p>{errors.description?.message}</p>

          <label>Frame</label>
          <select name="frame" ref={register}>
            {warframeData.frames.map((frame) => (
              <option key={frame} value={frame}>
                {frame}
              </option>
            ))}
          </select>
          <p>{errors.frame?.message}</p>

          {/* <label>Helmet</label>
          <select name="helmet" ref={register}>
            {getValues('frame') &&
              warframeData.helmets[getValues('frame')].map((helmet) => (
                <option key={helmet} value={helmet}>
                  {helmet}
                </option>
              ))}
          </select>
          <p>{errors.helmet?.message}</p> */}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default NewSetup;
