import { useState } from "react";
import { BsBag } from "react-icons/bs";
import Link from "next/link";

import { MdOutlineSearch } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import classes from "./Header.module.css";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  console.log(status);
  const [searchInputClicked, setSearchInputClicked] = useState(false);
  const inputClickHandler = () => {
    setSearchInputClicked(true);

    if (searchInputClicked) {
      setSearchInputClicked(false);
    }
  };
  const signOutHandler = () => {
    signOut();
  };

  const inputClasses = searchInputClicked
    ? classes["active"]
    : classes["input"];

  return (
    <div className={classes.header}>
      <div>
        <Link href="/" className={classes.nav__link_item_button}>
          <h1>HIREM</h1>
        </Link>
      </div>

      {session && session.user.email === "kaanarslan35@gmail.com" && (
        <div className={classes.panelLink}>
          <Link href="/admin-panel" className={classes.nav__link_item_button}>
            <h3>Admin Panel</h3>
          </Link>
        </div>
      )}
      <div className={classes.icons}>
        <div className={inputClasses} onClick={inputClickHandler}>
          <input type="text" />
          <span className={classes.icon + " " + classes.search}>
            <MdOutlineSearch />
          </span>
        </div>

        <Link href={session ? "/profile" : "/auth"} className={classes.icon}>
          <VscAccount />
        </Link>
        <Link href="/" className={classes.icon}>
          <BsBag />
        </Link>
        {session && (
          <button onClick={signOutHandler} className={classes.button}>
            <AiOutlineLogout />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
