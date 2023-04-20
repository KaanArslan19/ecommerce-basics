import { Fragment } from "react";
import { ObjectId } from "mongodb";

import ProductDetails from "../../components/products/ProductDetails";
import { connectToDatabase } from "../../lib/db";
const ProductPage = (props) => {
  return (
    <Fragment>
      <ProductDetails
        title={props.productData.title}
        price={props.productData.price}
        image={props.productData.image}
        description={props.productData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();
  const productsList = db.collection("products");
  const products = await productsList.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: products.map((product) => ({
      params: { productId: product._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const client = await connectToDatabase();

  const db = client.db();
  const productsList = db.collection("products");
  const selectedProduct = await productsList.findOne({
    _id: new ObjectId(productId),
  });
  client.close();

  return {
    props: {
      productData: {
        id: selectedProduct._id.toString(),
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        description: selectedProduct.description,
      },
    },
  };
}
export default ProductPage;
