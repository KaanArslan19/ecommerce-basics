import Link from "next/link";
import FlyoutCard from "../ui/FlyoutCard";
import classes from "./Navbar.module.css";
import { useState } from "react";
import { images } from "../../assets";

const Navbar = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [showCardFirstItem, setShowCardFirstItem] = useState(false);
  const [showCardSecondItem, setShowCardSecondItem] = useState(false);
  const [showCardThirdItem, setShowCardThirdItem] = useState(false);
  const dropdownHandler = () => {
    setDropdownToggle(true);

    if (dropdownToggle) {
      setDropdownToggle(false);
      setShowCardFirstItem(false);
      setShowCardSecondItem(false);
      setShowCardThirdItem(false);
    }
  };

  const showCardHandlerFirstItem = () => {
    setShowCardFirstItem(true);
    setShowCardSecondItem(false);
    setShowCardThirdItem(false);
    if (showCardFirstItem) {
      setShowCardFirstItem(false);
    }
  };

  const showCardHandlerSecondItem = () => {
    setShowCardSecondItem(true);
    setShowCardFirstItem(false);
    setShowCardThirdItem(false);
    if (showCardSecondItem) {
      setShowCardFirstItem(false);
    }
  };
  const showCardHandlerThirdItem = () => {
    setShowCardThirdItem(true);
    setShowCardSecondItem(false);
    setShowCardFirstItem(false);
    if (showCardThirdItem) {
      setShowCardFirstItem(false);
    }
  };

  const firstItemFlyOutCard = {
    id: "f1",
    list: ["All", "Classy", "Sport", "Cozy"],
    type: "bags",
    image: images.totebag,
  };
  const secondItemFlyOutCard = {
    id: "f2",
    list: ["All", "One Color", "Patch work", "Vignette"],
    type: "body-suit",
    image: images.bodysuit,
  };
  const thirdItemFlyOutCard = {
    id: "f3",
    list: ["All", "Shirts", "Tees", "Vignette"],
    type: "polars",
    image: images.whitepolar,
  };

  return (
    <div className={classes.nav__bar}>
      <ul className={classes.nav__link_menu}>
        <div className={classes.nav__link_dropdown}>
          <li
            className={classes.nav__link_item_button}
            onClick={dropdownHandler}
          >
            Shop
          </li>
          <div
            className={`${classes.nav__link_dropdownContent} ${
              dropdownToggle ? classes.show : ""
            }`}
          >
            <div className={classes.nav__link_items}>
              <ul>
                <li
                  className={classes.nav__link_item}
                  onClick={showCardHandlerFirstItem}
                >
                  <span className={classes.nav__link_item_button}>Bags</span>
                  <div
                    className={`${classes.nav__link_cardContent} ${
                      showCardFirstItem ? classes.show : ""
                    }`}
                  >
                    <FlyoutCard items={firstItemFlyOutCard} />
                  </div>
                </li>
                <li
                  className={classes.nav__link_item}
                  onClick={showCardHandlerSecondItem}
                >
                  <span className={classes.nav__link_item_button}>
                    Body Suits
                  </span>
                  <div
                    className={`${classes.nav__link_cardContent} ${
                      showCardSecondItem ? classes.show : ""
                    }`}
                  >
                    <FlyoutCard items={secondItemFlyOutCard} />
                  </div>
                </li>
                <li
                  className={classes.nav__link_item}
                  onClick={showCardHandlerThirdItem}
                >
                  <span href="" className={classes.nav__link_item_button}>
                    Polar
                  </span>
                  <div
                    className={`${classes.nav__link_cardContent} ${
                      showCardThirdItem ? classes.show : ""
                    }`}
                  >
                    <FlyoutCard items={thirdItemFlyOutCard} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <li>
            <Link href="about" className={classes.nav__link_item_button}>
              About
            </Link>
          </li>
          <li>
            <Link
              href="collections/products"
              className={classes.nav__link_item_button}
            >
              Products
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
