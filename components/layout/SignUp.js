import { useRef } from "react";
import classes from "./SignUp.module.css";
const SignUp = (props) => {
  const usernameRef = useRef();
  const pwRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = pwRef.current.value;
    const formData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    props.onAddUser(formData);
  };
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email:</label>
          <input type="email" required id="email" ref={usernameRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password:</label>
          <input type="password" required id="password" ref={pwRef} />
        </div>

        <div className={classes.actions}>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
