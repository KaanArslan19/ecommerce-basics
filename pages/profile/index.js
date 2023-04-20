import { getSession } from "next-auth/react";
import { Fragment } from "react";
import Profile from "../../components/profile/Profile";

const ProfilePage = () => {
  return (
    <Fragment>
      <Profile />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
