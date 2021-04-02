import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { WarframeData } from '../../types/WarframeData';
import Error from '../Utils/Error';
import newSetupSchema from '../../validation/newSetupSchema';
import { NewSetupFormData } from '../../types/Setup';
import NewSetupSetupSection from './NewSetupSetupSection';
import NewSetupSyandanaSection from './NewSetupSyandanaSection';
import NewSetupAttachmentsSection from './NewSetupAttachmentsSections';
import ColorSchemeSubsection from './ColorSchemeSubsection';

const NewSetupForm: React.VFC<{ warframeData: WarframeData }> = ({
  warframeData,
}) => {
  const {
    frames,
    helmets,
    skins,
    chestAttachments,
    armAttachments,
    legAttachments,
    ephemeras,
    syandanas,
    colorPickers,
  } = warframeData;
  const history = useHistory();

  const [createSetupError, setCreateSetupError] = React.useState<string>();

  const methods = useForm<NewSetupFormData>({
    resolver: yupResolver(newSetupSchema),
    defaultValues: {
      frame: 'Ash',
      helmet: 'Ash Helmet',
      skin: 'Ash Skin',
      attachments: {
        chest: '',
        leftArm: '',
        rightArm: '',
        leftLeg: '',
        rightLeg: '',
        ephemera: '',
      },
      syandana: {
        name: '',
      },
    },
  });

  const newSetupFormOnSubmit = methods.handleSubmit(async (setupWithImage) => {
    console.log(setupWithImage);
    const { screenshotImage, ...setup } = setupWithImage;

    const bodyFormData = new FormData();
    bodyFormData.append('screenshotImage', screenshotImage);
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
  });

  return (
    <div className="NewSetupForm">
      {createSetupError && <Error error={createSetupError} />}

      <FormProvider {...methods}>
        <form onSubmit={newSetupFormOnSubmit}>
          <NewSetupSetupSection
            frames={frames}
            helmets={helmets}
            skins={skins}
          />

          <ColorSchemeSubsection
            dataPrefix="colorScheme"
            colorPickers={colorPickers}
          />

          <NewSetupAttachmentsSection
            armAttachments={armAttachments}
            chestAttachments={chestAttachments}
            ephemeras={ephemeras}
            legAttachments={legAttachments}
          />

          <NewSetupSyandanaSection syandanas={syandanas} />

          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default NewSetupForm;
