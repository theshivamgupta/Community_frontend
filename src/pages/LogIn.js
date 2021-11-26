import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardHeader,
  Hidden,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/shared/ErrorAlert";
import SEO from "../components/shared/SEO";
import { LOGIN_USER } from "../graphql/mutations";
import { useLoginPageStyles } from "../styles";

const LogIn = () => {
  const classes = useLoginPageStyles();
  const navigate = useNavigate();
  const { handleSubmit, watch, control } = useForm({
    mode: "onBlur",
  });
  const [showPassword, setPasswordVisibility] = React.useState(false);
  const [error, setError] = React.useState(false);
  //   const [verifyError, setVerifyError] = React.useState(false);
  const [login] = useMutation(LOGIN_USER);
  const hasPassword = Boolean(watch("password"));

  function togglePasswordVisibility() {
    setPasswordVisibility((prev) => !prev);
  }

  async function onSubmit(data) {
    console.log(data);
    const variables = {
      email: data.input,
      password: data.password,
    };
    try {
      await login({ variables });
      navigate("/dash");
    } catch (error) {
      console.log({ error });
      setError(true);
    }
  }

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }
  //     setVerifyError(false);
  //   };
  return (
    <>
      <SEO title="Login" />
      {error && (
        <ErrorAlert message={"Invalid Credentials"} setError={setError} />
      )}
      <div className="container">
        <section className={classes.section}>
          <article>
            <Card className={classes.card}>
              <CardHeader className={classes.cardHeader} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="input"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                      variant="filled"
                      label="Username, email, or phone"
                      margin="dense"
                      className={classes.textField}
                      autoComplete="username"
                      InputProps={{
                        style: {
                          color: "#fff",
                        },
                      }}
                    />
                  )}
                  rules={{
                    required: true,
                    minLength: 5,
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputProps={{
                        endAdornment: hasPassword && (
                          <InputAdornment>
                            <Button
                              onClick={(e) => togglePasswordVisibility(e)}
                            >
                              {showPassword ? "Hide" : "Show"}
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      variant="filled"
                      label="Password"
                      margin="dense"
                      className={classes.textField}
                      autoComplete="current-password"
                    />
                  )}
                />

                <Button
                  //   disabled={!formState.isValid || formState.isSubmitting}
                  variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Log In
                </Button>
              </form>
              <div className={classes.orContainer}>
                <div className={classes.orLine} />
                <div>
                  <Typography variant="body2" color="textSecondary">
                    OR
                  </Typography>
                </div>
                <div className={classes.orLine} />
              </div>
              {/* <AuthError error={error} /> */}
              <Button
                fullWidth
                color="secondary"
                // onClick={(e) => handleForgetPass(e)}
              >
                <Typography variant="caption">Forgot password?</Typography>
              </Button>
            </Card>
            <Card className={classes.signUpCard}>
              <Typography align="right" variant="body2">
                Don't have an account?
              </Typography>
              <Link to="/accounts/signup">
                <Button color="primary" className={classes.signUpButton}>
                  Sign up
                </Button>
              </Link>
            </Card>
          </article>
        </section>
      </div>
    </>
  );
};

export default LogIn;