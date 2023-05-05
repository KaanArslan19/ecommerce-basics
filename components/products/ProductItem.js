import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./ProductItem.module.css";
const ProductItem = (props) => {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };
  return (
    <li className={classes.container} onClick={showDetailsHandler}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt="product" />
        </div>

        <div className={classes.content}>
          <h4>{props.title}</h4>
          <p>${props.price}</p>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
