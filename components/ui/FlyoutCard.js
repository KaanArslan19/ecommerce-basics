import React from "react";
import classes from "./FlyoutCard.module.css";

import Link from "next/link";
import Image from "next/image";

const FlyoutCard = ({ items }) => {
  return (
    <div className={classes.card__container}>
      <div className={classes.card__container_left}>
        <ul>
          {items.list.map((item) => (
            <Link href="" className={classes.nav__link_item_button}>
              <li key={item.id}>{item}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className={classes.card__container_right}>
        <Link
          href={`/collections/products/${items.type}`}
          className={classes.nav__link_item_button}
        >
          <Image src={items.image} alt="tote-bag" />
          <p>Shop {items.type}</p>
        </Link>
      </div>
    </div>
  );
};

export default FlyoutCard;
