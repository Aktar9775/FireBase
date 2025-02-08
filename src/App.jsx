import "bootstrap/dist/css/bootstrap.min.css";
import { Routes,Route } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Home from "./Component/Home";
import BookForm from "./Component/BookForm";
import Nav from "./Component/Nav";
import Detail from "./Component/Detail";
import Orders from "./Component/Orders";
function App() {
 
  return (
    <>
    <Nav></Nav>
    <Routes>
    <Route path="/" element={<Home></Home>}/>
    <Route path="/Login" element={<Login></Login>}/>
    <Route path="/Signin" element={<Signup></Signup>}/>
    <Route path="/Bookform" element={<BookForm></BookForm>}/>
    <Route path="/book/view/:bookID" element={<Detail/>}></Route>
    <Route path="//BookOrders" element={<Orders/>}></Route>
   </Routes>
    </>
 
  )
}

export default App
