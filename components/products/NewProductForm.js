import React, { useRef, useState } from "react";
import classes from "./NewProductForm.module.css";

const NewProductForm = (props) => {
  const [image, setImage] = useState("");
  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

  const convertToBase64 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
      image: image,
    };
    props.onAddProduct(formData);
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
            onChange={convertToBase64}
          />
          {image === "" || image === null ? (
            ""
          ) : (
            <img width={100} height={100} src={image} />
          )}
        </div>
        <div className={classes.actions}>
          <button>Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
