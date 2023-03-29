import React, { useRef } from "react";
import classes from "./NewProductForm.module.css";

const NewProductForm = (props) => {
  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    formData = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
      imageRef: imageRef.current.value,
    };
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">{props.title}</label>
        <input type="text" required id="title" ref={titleRef} />
      </div>

      <div className={classes.control}>
        <label htmlFor="price">Product Price</label>
        <input type="number" required id="price" ref={priceRef} />
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          required
          id="description"
          rows="5"
          ref={descRef}
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="price">Product Image</label>
        <input
          type="file"
          required
          id="title"
          accept=".jpg, .png, .jpeg"
          ref={imageRef}
        />
      </div>
      <div className={classes.actions}>
        <button>Add Product</button>
      </div>
    </form>
  );
};

export default NewProductForm;
