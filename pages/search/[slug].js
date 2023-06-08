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
const findProduct = (input, data) => {
  input = input.toLowerCase();
  data = data.toLowerCase();
  let matched = 0;
  let mismatched = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === data[i]) {
      matched++;
    } else {
      mismatched++;
    }
  }
  if (matched > mismatched) {
    return true;
  } else {
    return false;
  }
};

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();
  const productsList = db.collection("products");
  const products = await productsList.find({}, { title: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: products.map((product) => ({
      params: { slug: product.title && product.type },
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
      findProduct(enteredInputValue, product.title) ||
      findProduct(enteredInputValue, product.type)
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
