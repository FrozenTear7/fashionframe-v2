/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAdd';
import { SignUpFormData } from '../../types/SignUp';
import signUpSchema from '../../validation/signUpSchema';
import Error from '../Utils/Error';
import { signUp } from '../../utils/auth';
import { useUserContext } from '../../UserContext';
import useSignUpFormStyles from './useSignUpFormStyles';

const SignUpForm: React.VFC = () => {
  const classes = useSignUpFormStyles();

  const { setUser } = useUserContext();
  const [signUpError, setSignUpError] = React.useState<string>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password2: '',
    },
  });

  const signUpFormOnSubmit = handleSubmit(
    async ({ username, email, password, password2 }) => {
      try {
        const userRes = await signUp(username, email, password, password2);
        setUser(userRes);
      } catch ({ response }) {
        console.log(response.data.message);
        setSignUpError(response.data.message);
      }
    }
  );

  return (
    <div className="SignUpForm">
      {signUpError && <Error error={signUpError} />}

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            onSubmit={signUpFormOnSubmit}
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
                  helperText={
                    errors.email?.message ? errors.email?.message : ''
                  }
                  autoComplete="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link to="/signin">Already have an account? Sign In</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignUpForm;
