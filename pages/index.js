import Head from "next/head";
import { Fragment } from "react";
import ProductList from "../components/products/ProductList";
import { connectToDatabase } from "../lib/db";

const HomePage = ({ products }) => {
  return (
    <Fragment>
      <Head>
        <title>HIER</title>
        <meta name="HomePage" content="Main Content" />
      </Head>
      <ProductList products={products} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await connectToDatabase();

  const db = client.db();
  const productList = db.collection("products");
  const products = await productList.find().toArray();
  client.close();

  return {
    props: {
      products: products.map((product) => ({
        id: product._id.toString(),
        title: product.title,
        image: product.image,
        price: product.price,
        type: product.type,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
