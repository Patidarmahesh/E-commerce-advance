import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from 'react-hot-toast';
import { useTheme } from "../../Context/Theme";

const Layout = ({ children }) => {
  const [theme, setTheme] = useTheme();
  return (
    <div>
      <Header />
      <main style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}><Toaster/>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
