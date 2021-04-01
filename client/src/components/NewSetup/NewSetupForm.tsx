/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { WarframeData } from '../../types/WarframeData';
import Error from '../../utils/Error';
import newSetupSchema from '../../validation/newSetupSchema';
import { NewSetupFormData } from '../../types/Setup';
import NewSetupSetupSection from './NewSetupSetupSection';
import NewSetupSyandanaSection from './NewSetupSyandanaSection';
import NewSetupAttachmentsSection from './NewSetupAttachmentsSections';
// import ColorSchemeSubsection from './ColorSchemeSubsection';

const NewSetupForm: React.VFC<{ warframeData: WarframeData }> = ({
  warframeData,
}) => {
  const history = useHistory();

  const [createSetupError, setCreateSetupError] = React.useState<string>();

  const {
    register,
    handleSubmit,
    errors,
    watch,
    control,
    setValue,
  } = useForm<NewSetupFormData>({
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

  const {
    frame: currentFrame,
    helmet: currentHelmet,
    skin: currentSkin,
  } = watch();

  const newSetupFormOnSubmit = handleSubmit(async (setupWithImage) => {
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

  console.log(currentFrame);
  console.log(currentHelmet);
  console.log(currentSkin);

  return (
    <div className="NewSetupForm">
      {createSetupError && <Error error={createSetupError} />}

      <form onSubmit={newSetupFormOnSubmit}>
        <NewSetupSetupSection
          frames={warframeData.frames}
          helmets={warframeData.helmets}
          skins={warframeData.skins}
          currentFrame={currentFrame}
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />

        {/* <ColorSchemeSubsection
          dataPrefix="colorScheme"
          colorPickers={warframeData.colorPickers}
          control={control}
        /> */}

        <NewSetupAttachmentsSection
          armAttachments={warframeData.armAttachments}
          chestAttachments={warframeData.chestAttachments}
          ephemeras={warframeData.ephemeras}
          legAttachments={warframeData.legAttachments}
          errors={errors}
          control={control}
        />

        <NewSetupSyandanaSection
          syandanas={warframeData.syandanas}
          errors={errors}
          control={control}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default NewSetupForm;
