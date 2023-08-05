import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./components/Routes/Private";
import AdminPrivate from "./components/Routes/AdminPrivate";
import UserDashboard from "./pages/Users/UserDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PageNotFound from "./pages/PageNotFound";
import CreateCategory from "./pages/Admin/CreateCategory";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import Products from "./pages/Admin/Products";
import EditProduct from "./pages/Admin/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Favorites from "./pages/Favorites";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Users/Profile";
import Footer from "./components/Footer";

function App() {
  
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4 mx-auto ">
          <Toaster/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/category/:slug' element={<CategoryProducts/>}/>
             <Route path='/product/:slug' element={<ProductDetails/>}/>
             <Route path='/favorites' element={<Favorites/>}/>
             <Route path='/cart' element={<CartPage />}/>
            <Route path="*" element={<PageNotFound />} />

            <Route path="/dashboard" element={<Private />}>
              <Route path="user" element={<UserDashboard />} />
              <Route path="user/profile" element={<Profile />} />
            </Route>

            <Route path="/dashboard" element={<AdminPrivate />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path='admin/products' element={<Products/>}/>
              <Route path='admin/products/:id' element={<EditProduct/>}/>
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
            </Route>
            
          </Routes>
        </Container>
        <Footer/>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
