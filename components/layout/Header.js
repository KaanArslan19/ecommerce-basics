import React from "react";
import { BsBag } from "react-icons/bs";
import Link from "next/link";

import { MdOutlineSearch } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <div>
        <Link href="/" className={classes.nav__link_item_button}>
          <h1>HIER</h1>
        </Link>
      </div>
      <div>
        <Link href="/" className={classes.icon}>
          <MdOutlineSearch />
        </Link>
        <Link href="signup" className={classes.icon}>
          <VscAccount />
        </Link>
        <Link href="/" className={classes.icon}>
          <BsBag />
        </Link>
      </div>
    </div>
  );
};

export default Header;
