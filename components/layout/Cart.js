import React from "react";
import classes from "./Cart.module.css";
import Link from "next/link";

import { BsChevronLeft } from "react-icons/bs";

const Cart = (props) => {
  const showCartHandler = () => {
    props.show();
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <button
          type="button"
          className={classes.cartHeading}
          onClick={showCartHandler}
        >
          <BsChevronLeft />
          <span className={classes.heading}>Your Cart</span>
          <span className={classes.numberOfItems}>({10} items)</span>
        </button>
        <div className={classes.emptyCart}>
          <h3> Your Shopping bag is empty </h3>
          <Link href="/">
            <button
              type="button"
              onClick={showCartHandler}
              className={classes.button}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
        <div className={classes.productContainer}>
          <div className={classes.product}></div>
        </div>

        <div className={classes.cartBottom}>
          <div className={classes.totalPrice}>
            <h3>Subtotal: </h3>
            <h3>$ Total Price will be Here</h3>
          </div>
          <div className={classes.btnContainer}>
            <button type="button" className={classes.button}>
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
