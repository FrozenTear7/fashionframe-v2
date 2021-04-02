/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { LocationState } from '../../types';
import { SignInFormData } from '../../types/SignIn';
import signInSchema from '../../validation/signInSchema';
import Error from '../Utils/Error';
import { signIn } from '../../utils/auth';
import { useUserContext } from '../../UserContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInForm: React.VFC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const { setUser } = useUserContext();
  const [signInError, setSignInError] = React.useState<string>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const signInFormOnSubmit = async ({
    username,
    password,
  }: SignInFormData): Promise<void> => {
    const { from }: LocationState = (location.state as LocationState) || {
      from: { pathname: '/' },
    };

    try {
      const userRes = await signIn(username, password);
      setUser(userRes);
      history.replace(from);
    } catch ({ response }) {
      console.log(response.data.message);
      setSignInError(response.data.message);
    }
  };

  return (
    <div className="SignInForm">
      {signInError && <Error error={signInError} />}

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={handleSubmit(signInFormOnSubmit)}
            className={classes.form}
            noValidate
          >
            <Controller
              name="username"
              control={control}
              render={({ field }): JSX.Element => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  error={!!errors.username?.message}
                  helperText={
                    errors.username?.message ? errors.username?.message : ''
                  }
                  autoFocus
                />
              )}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link to="/signup">Don&apos;t have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignInForm;
