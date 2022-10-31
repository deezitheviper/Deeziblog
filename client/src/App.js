import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import Post from "./pages/Post";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Layout from "./components/Layout";
import Cat from "./pages/categories/Cat";
import Posts from "./pages/Posts";
import './assets/style.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Profile from "./pages/Profile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/Articles/Search",
        element: <Posts/>,
      },
      {
        path: "/Articles",
        element: <Posts/>,
      },
      {
        path: "/Category/:cat",
        element: <Cat />,
      },
      {
        path: "/create",
        element: <Write/>,
      },
      {
        path: "/:cat/:slug",
        element: <Post/>,
      },
      {
        path: "/Profile/:authur",
        element: <Profile/>,
      },
      {
        path: "*",
        element:< Navigate to="/"/>,
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },

  
]);

function App() {
  return (
    <>
    <ToastContainer />
     <RouterProvider router={router} />
     </>
   
  );
}

export default App;
