import React from "react";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

const ProductList = (props) => {
  return (
    <ul className={classes.list}>
      {props.products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          type={product.type}
          price={product.price}
        />
      ))}
    </ul>
  );
};

export default ProductList;
