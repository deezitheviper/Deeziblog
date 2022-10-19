import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Post from "./pages/Post";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Layout from "./components/Layout";
import Python from "./pages/categories/Python";
import Javascript from "./pages/categories/Javascript";
import MachineLearning from "./pages/categories/ML";
import OS from "./pages/categories/OS";
import './assets/style.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


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
        path: "/Python",
        element: <Python />,
      },
      {
        path: "/Javascript",
        element: <Javascript />,
      },
      {
        path: "/ML",
        element: <MachineLearning />,
      },
      {
        path: "/Offensivesec",
        element: <OS />,
      },
      {
        path: "/create",
        element: <Write/>,
      },
      {
        path: "/:cat/:slug",
        element: <Post/>,
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
  }
  
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
