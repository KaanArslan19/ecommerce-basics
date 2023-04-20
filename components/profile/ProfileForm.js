import { useRef } from "react";

import classes from "./ProfileForm.module.css";

const ProfileForm = (props) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // add 7 character validation
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <section className={classes.box}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <input type="password" id="new-password" ref={newPasswordRef} />
          <label className={classes.label} htmlFor="new-password">
            New Password
          </label>
        </div>
        <div className={classes.control}>
          <input type="password" id="old-password" ref={oldPasswordRef} />
          <label className={classes.label} htmlFor="old-password">
            Old Password
          </label>
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
