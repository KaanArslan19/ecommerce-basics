import React from "react";
import Navbar from "./Navbar";
import { Fragment } from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <main>{props.children} </main>
    </Fragment>
  );
};

export default Layout;
