import { Fragment } from "react";
import ProductList from "../../components/products/ProductList";
import { connectToDatabase } from "../../lib/db";

const SearchPage = ({ products }) => {
  return (
    <Fragment>
      <ProductList products={products} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();
  const productsList = db.collection("products");
  const products = await productsList.find({}, { title: 1, type: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: products.map((product) => ({
      params: { slug: product.type && product.title },
    })),
  };
}

export async function getStaticProps(context) {
  const enteredInputValue = context.params.slug;
  const client = await connectToDatabase();
  const db = client.db();
  const productList = db.collection("products");
  const products = await productList.find().toArray();
  const filteredProducts = products.filter((product) => {
    return (
      product.title.includes(enteredInputValue) &&
      product.type.includes(enteredInputValue)
    );
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
  };
}
export default SearchPage;
