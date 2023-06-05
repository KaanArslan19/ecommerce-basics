import Image from "next/image";
import classes from "./ProductDetails.module.css";
import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const ProductDetails = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const trigRef = useRef();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== trigRef.current) {
        setOpenMenu(false);
      }
    });
  }, [menuRef, trigRef]);

  const triggerHandler = () => {
    setOpenMenu(true);
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.left}>
        <h1>{props.title}</h1>

        <div className={classes.trigger} onClick={triggerHandler}>
          <h5 ref={trigRef}>Product Details and Sizing</h5>
          <MdOutlineArrowDropDown
            className={
              openMenu
                ? [classes.icon + " " + classes.iconActive]
                : classes.icon
            }
          />
        </div>
        {openMenu && (
          <div className={classes.dropdown} ref={menuRef}>
            <ul>
              <li>Product Features1</li>
              <li>Product Features2</li>
              <li>Product Features3</li>
            </ul>
          </div>
        )}
      </div>
      <div className={classes.center}>
        <Image src={props.image} width={500} height={500} alt={props.title} />
      </div>
      <div className={classes.right}>
        <div className={classes.comboContainer}>
          <select className={classes.combo}>
            <option>Select Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
