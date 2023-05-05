import classes from "./Profile.module.css";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const changePasswordHandler = async (passwordData) => {
    try {
      let body = JSON.stringify(passwordData);
      console.log("bodybody : ", body);
      const response = await fetch("/api/auth/change-password", {
        method: "PATCH",
        body: body,
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={classes.profile}>
      <h1>Your user Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
};

export default Profile;
