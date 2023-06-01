import { useRef, useState } from "react";
import { BsBag } from "react-icons/bs";
import Link from "next/link";

import { MdOutlineSearch } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import classes from "./Header.module.css";
import { signOut, useSession } from "next-auth/react";
import Cart from "./Cart";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showCart, setShowCart] = useState(false);
  const searchInputRef = useRef();
  const [enteredValue, setEnteredValue] = useState("");

  const [searchInputClicked, setSearchInputClicked] = useState(false);
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputClickHandler = () => {
    setSearchInputClicked(true);

    if (searchInputClicked) {
      setSearchInputClicked(false);
    }
  };
  const searchButtonHandler = () => {
    if (enteredValue.trim() === "") {
      return;
    }
    router.push("/search/" + enteredValue);
    setEnteredValue("");
  };

  const signOutHandler = () => {
    signOut();
  };
  const showCartHandler = () => {
    setShowCart(true);

    if (showCart) {
      setShowCart(false);
    }
  };

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
        <span className={classes.inputContainer}>
          <input
            type="text"
            maxLength={25}
            ref={searchInputRef}
            value={enteredValue}
            placeholder="search"
            name="search"
            id="search"
            onChange={inputChangeHandler}
            onClick={inputClickHandler}
            className={classes.input}
          />

          <button
            onClick={searchButtonHandler}
            href={searchButtonHandler}
            className={
              classes.icon + " " + classes.search + " " + classes.button
            }
          >
            <MdOutlineSearch />
          </button>
        </span>

        <Link href={session ? "/profile" : "/auth"} className={classes.button}>
          <VscAccount />
        </Link>
        <button onClick={showCartHandler} className={classes.button}>
          <BsBag />
        </button>
        {session && (
          <button onClick={signOutHandler} className={classes.button}>
            <AiOutlineLogout />
          </button>
        )}
        {showCart && <Cart show={showCartHandler} />}
      </div>
    </div>
  );
};

export default Header;
