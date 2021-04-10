import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { LocationState } from '../../types';
import Error from '../Utils/Error';
import forgotPasswordSchema from '../../validation/forgotPasswordSchema';
import { ForgotPasswordFormData } from '../../types/ForgotPassword';
import useForgotPasswordFormStyles from './useForgotPasswordFormStyles';

const forgotPasswordFormDefaultValues = {
  email: '',
};

const ForgotPasswordForm: React.VFC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useForgotPasswordFormStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [forgotPasswordLoading, setForgotPasswordLoading] = React.useState(
    false
  );
  const [
    forgotPasswordError,
    setForgotPasswordError,
  ] = React.useState<string>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordFormDefaultValues,
  });

  const forgotPasswordFormOnSubmit = async ({
    email,
  }: ForgotPasswordFormData): Promise<void> => {
    const { from }: LocationState = (location.state as LocationState) || {
      from: { pathname: '/signin' },
    };

    setForgotPasswordError(undefined);
    setForgotPasswordLoading(true);

    try {
      await axios.post('/api/users/forgot', {
        email,
      });
      enqueueSnackbar('Check your email inbox for further information', {
        variant: 'success',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      history.replace(from);
    } catch ({ response }) {
      setForgotPasswordError(response.data.message);
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ContactSupportIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Password recovery
      </Typography>
      <form
        onSubmit={handleSubmit(forgotPasswordFormOnSubmit)}
        className={classes.form}
        noValidate
      >
        <Controller
          name="email"
          control={control}
          render={({ field }): JSX.Element => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              error={!!errors.email?.message}
              helperText={errors.email?.message ? errors.email?.message : ''}
              autoComplete="email"
            />
          )}
        />
        {forgotPasswordError && <Error error={forgotPasswordError} />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={forgotPasswordLoading}
        >
          Recover password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
