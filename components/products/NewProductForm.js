import React, { useRef } from "react";
import classes from "./NewProductForm.module.css";

const NewProductForm = (props) => {
  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
      /*       imageRef: imageRef.current.value,
       */
    };
    props.onAddProduct(formData);
    console.log(formData);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="price">Price</label>

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
          <label htmlFor="price">Image</label>

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
    </div>
  );
};

export default NewProductForm;
