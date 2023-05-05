import { connectToDatabase } from "../../../../lib/db";

import React from "react";
import ProductList from "../../../../components/products/ProductList";

const ProductsPageByType = (props) => {
  return (
    <div>
      <ProductList products={props.productType} />
    </div>
  );
};

export default ProductsPageByType;

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();
  const productsList = db.collection("products");
  const productTypes = await productsList
    .find({}, { type: 1, _id: 0 })
    .toArray();

  client.close();
  if (!productTypes) {
    return { notFound: true };
  }

  return {
    fallback: "blocking",
    paths: productTypes.map((item) => ({
      params: { productType: item.type },
    })),
  };
}
export async function getStaticProps(context) {
  const productType = context.params.productType;
  const client = await connectToDatabase();
  const db = client.db();
  const productList = db.collection("products");
  const filteredProducts = await productList
    .find({ type: productType }, { type: 1, _id: 0, image: 0, price: 0 })
    .toArray();

  console.log("filtered Products: ", filteredProducts);

  client.close();

  return {
    props: { productType: filteredProducts.type },
    revalidate: 1,
  };
}
