import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, Navigate } from "react-router-dom";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./login.scss";
import { useForm } from "react-hook-form";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const envVar = process.env.REACT_APP_ENV;

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmitForm = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if ("accessToken" in data.payload) {
      window.localStorage.setItem(
        "token",
        "Bearer " + data.payload.accessToken
      );
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: "root" }}>
      <Typography
        data-cy="login-title"
        classes={{ root: "title" }}
        variant="h5"
      >
        Login: {envVar}
      </Typography>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          className="field"
          data-cy="name-input"
          label="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "set email" })}
          fullWidth
        />
        <TextField
          className="field"
          data-cy="password-input"
          label="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "set password" })}
          fullWidth
        />
        <Button
          data-cy="login-button"
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
