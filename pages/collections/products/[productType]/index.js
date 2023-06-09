import { connectToDatabase } from "../../../../lib/db";

import React from "react";
import ProductList from "../../../../components/products/ProductList";

const ProductsPageByType = ({ products }) => {
  return (
    <div>
      <ProductList products={products} />
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
  const products = await productList.find().toArray();
  const filteredProducts = products.filter((product) => {
    return product.type === productType;
  });

  client.close();

  return {
    props: {
      products: filteredProducts.map((product) => ({
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
