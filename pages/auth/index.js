import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import AuthForm from "../../components/layout/AuthForm";
import { getSession } from "next-auth/react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  //For FE route protection

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <AuthForm />
    </Fragment>
  );
};

export default RegisterPage;
