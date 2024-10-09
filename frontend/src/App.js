import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import AdminRoute from "./Component/Routes/AdminRoute";
import AdminDashbored from "./Pages/Admin/AdminDashbored";
import UserRoute from "./Component/Routes/PrivteRoute";
import UserDashbored from "./Pages/User/UserDashbored";
import CreateCateory from "./Pages/Admin/CreateCateory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";
import Product from "./Pages/Admin/Product";
import UpdatePrroduct from "./Pages/Admin/UpdatePrroduct";
import OfferDetails from "./Pages/OfferDetails";
import CardDetail from "./Pages/CardDetail";
import SearchData from "./Pages/SearchData";
import Categories from "./Pages/Categories";
import CategoriesProduct from "./Pages/CategoriesProduct";
import CartItem from "./Pages/CartItem";
import { useTheme } from "./Context/Theme";
import ColorPicker from "./Pages/Policy";

function App() {
  const [theme] = useTheme();
  return (
    <div style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart-item" element={<CartItem />} />
        
        <Route path="/dashbored" element={<UserRoute />}>
          <Route path="user" element={<UserDashbored />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashbored" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashbored />} />
          <Route path="admin/create-category" element={<CreateCateory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdatePrroduct />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<ColorPicker />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offer/:id" element={<OfferDetails />} />
        <Route path="/card-details/:slug" element={<CardDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<CategoriesProduct />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
