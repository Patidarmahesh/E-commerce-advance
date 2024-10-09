import React from "react";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import "./commen.css";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../Context/Cart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 4,
    top: 1,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 6px',
  },
}));

const Header = () => {
  const [auth, setAuth] = useAuth();
  const category = useCategory();
  const [cart] = useCart();
  
  const AuthLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ background: "#232f3e" }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Link to="/" className="navbar-brand">
          <ShoppingCartIcon /> ecommerace web
        </Link>
        <SearchInput />
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <li className="nav-item">
              <div class="dropdown">
                <button class="dropbtn">
                  Categories
                  <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown2-content">
                  <NavLink to="/categories" style={{ border: "none" }}>
                    Categories
                  </NavLink>
                  {category?.map((value) => {
                    return (
                      <NavLink
                        to={`/categories/${value.slug}`}
                        style={{ border: "none" }}
                      >
                        {value.name}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </li>
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <div class="dropdown">
                  <button class="dropbtn">
                    {auth?.user?.name}
                    <i class="fa fa-caret-down"></i>
                  </button>
                  <div class="dropdown-content">
                    <NavLink
                      to={`/dashbored/${
                        auth?.user?.role === "1" ? "admin" : "user"
                      }`}
                    >
                      DashBored
                    </NavLink>
                    <NavLink to="/login" onClick={AuthLogout}>
                      Logout
                    </NavLink>
                  </div>
                </div>
              </li>
            </>
          )}
          <li className="nav-item">
            <NavLink to="/cart-item" className="nav-link">
                <StyledBadge badgeContent={cart?.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
