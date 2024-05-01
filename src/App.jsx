import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Blog from "./pages/Blog";
import About from "./pages/About";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import SinglePost from "./pages/SinglePost";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-2 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/blog/:id" element={<SinglePost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
