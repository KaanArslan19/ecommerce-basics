import React from "react";
import ProductList from "../../../components/products/ProductList";
import { connectToDatabase } from "../../../lib/db";
const ProductsPage = (props) => {
  return (
    <div>
      <ProductList products={props.products} />
    </div>
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
        description: product.description,
      })),
    },
    revalidate: 1,
  };
}

export default ProductsPage;
