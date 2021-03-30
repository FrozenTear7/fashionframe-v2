/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { WarframeData } from '../../types/WarframeData';
import Error from '../../utils/Error';
import Loading from '../../utils/Loading';

const NewSetup: React.VFC = () => {
  const [warframeData, setWarframeData] = React.useState<WarframeData>();
  const [warframeDataLoading, setWarframeDataLoading] = React.useState(false);
  const [warframeDataError, setWarframeDataError] = React.useState<string>();
  const [createSetupError, setCreateSetupError] = React.useState<string>();

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

  const setupFormOnSubmit = async (
    name: string,
    description: string,
    screenshotImage?: File
  ): Promise<void> => {
    const setup = {
      name,
      description,
      screenshotImage,
    };

    // Can't figure out how to pass screenshotImage value correctly so it has to asserted this way for now
    const bodyFormData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    bodyFormData.append('screenshotImage', screenshotImage!);
    bodyFormData.append('setup', JSON.stringify(setup));

    try {
      console.log('xddd');
      console.log(bodyFormData);
      await axios({
        method: 'post',
        url: '/api/setups',
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch ({ response }) {
      console.log(response);
      setCreateSetupError(response.data.message);
    }
  };

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
      <div className="SignInForm">
        {createSetupError && <Error error={createSetupError} />}
        <Formik
          initialValues={{
            name: '',
            description: '',
            screenshotImage: undefined,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, 'Must be at least 3 characters long')
              .required('Required'),
            screenshotImage: Yup.mixed().required('Required'),
          })}
          onSubmit={async (
            { name, description, screenshotImage },
            { setSubmitting }
          ): Promise<void> => {
            await setupFormOnSubmit(name, description, screenshotImage);

            setSubmitting(false);
          }}
        >
          {(props) => {
            const {
              getFieldProps,
              setFieldValue,
              touched,
              errors,
              handleSubmit,
            } = props;

            return (
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" {...getFieldProps('name')} />
                {touched.name && errors.name ? <div>{errors.name}</div> : null}

                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  {...getFieldProps('description')}
                />
                {touched.description && errors.description ? (
                  <div>{errors.description}</div>
                ) : null}

                <label htmlFor="screenshotImage">Screenshot</label>
                <input
                  id="screenshotImage"
                  {...getFieldProps('screenshotImage')}
                  name="screenshotImage"
                  type="file"
                  onChange={(event): void => {
                    if (event.currentTarget.files)
                      setFieldValue(
                        'screenshotImage',
                        event.currentTarget.files[0]
                      );
                  }}
                />
                {touched.screenshotImage && errors.screenshotImage ? (
                  <div>{errors.screenshotImage}</div>
                ) : null}

                <button type="submit">Create setup</button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default NewSetup;
