import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import NewProductForm from "../../components/products/NewProductForm";
const AdminPanelPage = () => {
  const Dummy_ProductTypes = ["bag", "polar", "jacket", "bodysuit"];
  const router = useRouter();
  const addProductHandler = async (enteredProductInfo) => {
    const response = await fetch("/api/addproduct", {
      method: "POST",
      body: JSON.stringify(enteredProductInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
  };
  return (
    <Fragment>
      <NewProductForm
        onAddProduct={addProductHandler}
        productTypes={Dummy_ProductTypes}
      />
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

export default AdminPanelPage;
