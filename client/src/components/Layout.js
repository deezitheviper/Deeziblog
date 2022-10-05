import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


const Layout = () => {
    return (
        <div className="app">
        <div className="container">
     <Header/>
     <Outlet/>
     <Footer/>
     </div>
     </div>
    );
};

export default Layout;