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

const NewSetupForm: React.VFC<{ warframeData: WarframeData }> = ({
  warframeData,
}) => {
  const history = useHistory();

  const [createSetupError, setCreateSetupError] = React.useState<string>();

  const { register, handleSubmit, errors, watch } = useForm<NewSetupFormData>({
    resolver: yupResolver(newSetupSchema),
    defaultValues: {
      frame: 'Ash',
    },
  });

  const { frame: currentFrame } = watch();

  const newSetupFormOnSubmit = handleSubmit(async (setupWithImage) => {
    const { screenshotImage, ...setup } = setupWithImage;

    console.log(screenshotImage);

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

  console.log(errors);

  return (
    <div className="NewSetupForm">
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

        <label>Helmet</label>
        <select name="helmet" ref={register}>
          {currentFrame &&
            warframeData.helmets[currentFrame].map((helmet) => (
              <option key={helmet} value={helmet}>
                {helmet}
              </option>
            ))}
        </select>
        <p>{errors.helmet?.message}</p>

        <label>Skin</label>
        <select name="skin" ref={register}>
          {currentFrame &&
            warframeData.skins[currentFrame].map((skin) => (
              <option key={skin} value={skin}>
                {skin}
              </option>
            ))}
        </select>
        <p>{errors.skin?.message}</p>

        <label>Screenshot</label>
        <input
          name="screenshotImage"
          type="file"
          accept="image/*"
          ref={register}
        />
        <p>{errors.screenshotImage}</p>

        <input type="submit" />
      </form>
    </div>
  );
};

export default NewSetupForm;
