import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./ProductItem.module.css";
import Image from "next/image";
const ProductItem = (props) => {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/product/" + props.id);
  };
  return (
    <li className={classes.container} onClick={showDetailsHandler}>
      <Card>
        <div className={classes.image}>
          <Image src={props.image} alt="product" width={400} height={400} />
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
