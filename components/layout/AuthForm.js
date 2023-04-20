import classes from "./AuthForm.module.css";
import useValidation from "../../hooks/use-validation";
import { AiOutlineWarning } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

let existingUser = false;
async function createUser(email, password) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.message === "User Exists!") {
    existingUser = true;
  }
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const AuthForm = () => {
  console.log(existingUser);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
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

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace("/profile");
      } else {
        console.log(result);
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
        router.replace("/");
      } catch (error) {
        console.log(error);
      }
    }
    resetEmailInput();
    resetPasswordInput();
  };

  const passwordClasses = passwordInputHasError
    ? classes["control"] + " " + classes["invalid"]
    : classes["control"];

  const emailClasses = emailInputHasError
    ? classes["control"] + " " + classes["invalid"]
    : classes["control"];

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        {existingUser && (
          <div className={classes.warning}>
            <p> User Exists! </p>
            <AiOutlineWarning className={classes.icon} />
          </div>
        )}
        <div className={emailClasses}>
          <input
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            type="email"
            id="email"
          />
          <label htmlFor="email">Email</label>

          {emailInputHasError && <p>Please enter a valid email.</p>}
        </div>
        <div className={passwordClasses}>
          <input
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            type="password"
            id="password"
          />
          <label htmlFor="password">Password</label>

          {passwordInputHasError && <p>Please enter a valid email.</p>}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <p
            type="button"
            onClick={switchAuthModeHandler}
            className={classes.toggle}
          >
            {isLogin ? "Create a new account" : "Login with existing account"}{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
