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
import { Paper } from '@material-ui/core';
import { LocationState } from '../../types';
import Error from '../Utils/Error';
import useRecoveryFormStyles from './useRecoveryFormStyles';
import recoverySchema from '../../validation/recoverySchema';
import { RecoveryFormData } from '../../types/Recovery';

interface RecoveryFormProps {
  token: string;
}

const recoveryFormDefaultValues = {
  password: '',
  password2: '',
};

const RecoveryForm: React.VFC<RecoveryFormProps> = ({ token }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useRecoveryFormStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [recoveryLoading, setRecoveryLoading] = React.useState(false);
  const [recoveryError, setRecoveryError] = React.useState<string>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecoveryFormData>({
    resolver: yupResolver(recoverySchema),
    defaultValues: recoveryFormDefaultValues,
  });

  const recoveryFormOnSubmit = async ({
    password,
    password2,
  }: RecoveryFormData): Promise<void> => {
    const { from }: LocationState = (location.state as LocationState) || {
      from: { pathname: '/signin' },
    };

    setRecoveryError(undefined);
    setRecoveryLoading(true);

    try {
      await axios.post(`/api/users/reset/${token}`, {
        password,
        password2,
      });
      enqueueSnackbar('Password changed successfully', {
        variant: 'success',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      history.replace(from);
    } catch ({ response }) {
      setRecoveryError(response.data.message);
      setRecoveryLoading(false);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ContactSupportIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Password recovery
      </Typography>
      <form
        onSubmit={handleSubmit(recoveryFormOnSubmit)}
        className={classes.form}
        noValidate
      >
        <Controller
          name="password"
          control={control}
          render={({ field }): JSX.Element => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              error={!!errors.password?.message}
              helperText={
                errors.password?.message ? errors.password?.message : ''
              }
            />
          )}
        />
        <Controller
          name="password2"
          control={control}
          render={({ field }): JSX.Element => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password2"
              label="Repeat password"
              type="password"
              error={!!errors.password2?.message}
              helperText={
                errors.password2?.message ? errors.password2?.message : ''
              }
            />
          )}
        />
        {recoveryError && <Error error={recoveryError} />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={recoveryLoading}
        >
          Change password
        </Button>
      </form>
    </Paper>
  );
};

export default RecoveryForm;
