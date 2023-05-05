import Head from "next/head";
import { Fragment } from "react";
import ProductList from "../components/products/ProductList";
import { connectToDatabase } from "../lib/db";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Hirem </title>
        <meta name="description" content="Some Content" />
      </Head>
      <ProductList products={props.products} />
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
