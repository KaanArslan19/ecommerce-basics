import { useRef } from "react";
import classes from "./SignUp.module.css";
import useValidation from "../../hooks/use-validation";
const SignUp = (props) => {
  const {
    value: enteredPassword,
    isValid: enteredPasswordisValid,
    hasError: passwordInputHasError,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useValidation((value) => value.trim().length > 5);
  const {
    value: enteredEmail,
    isValid: enteredEmailisValid,
    hasError: emailInputHasError,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useValidation((value) => value.includes("@") && value.trim() !== "");

  let formIsValid = false;
  if (enteredPasswordisValid && enteredEmailisValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const formData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onAddUser(formData);
    resetEmailInput();
    resetPasswordInput();
  };

  const passwordClasses = passwordInputHasError
    ? classes["control"] + " " + classes["invalid"]
    : classes["control"];

  const emailClasses = emailInputHasError
    ? classes["control"] + " " + classes["invalid"]
    : classes["control"];
  console.log(emailInputHasError);
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={emailClasses}>
          <label htmlFor="email">Email:</label>
          <input
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            type="email"
            id="email"
          />
          {emailInputHasError && <p>Please enter a valid email.</p>}
        </div>

        <div className={passwordClasses}>
          <label htmlFor="password">Password:</label>
          <input
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            type="password"
            id="password"
          />
          {passwordInputHasError && <p>Please enter a valid email.</p>}
        </div>

        <div className={classes.actions}>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
