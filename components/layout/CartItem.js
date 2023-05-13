import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import classes from "./CartItem.module.css";
const CartItem = () => {
  const dispatch = useDispatch();
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>Title</h3>
        <div className={classes.price}>
          $Total Price
          <span className={classes.itemprice}>Price/item</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>Quantity</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
