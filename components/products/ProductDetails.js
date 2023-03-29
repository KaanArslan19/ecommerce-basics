import Card from "../ui/Card";
import classes from "./ProductDetail.module.css";

const ProductDetails = (props) => {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt="product" />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <p>${props.price}</p>
        </div>
      </Card>
    </li>
  );
};

export default ProductDetails;
