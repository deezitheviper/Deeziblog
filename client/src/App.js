import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Layout from "./components/Layout";
import './assets/style.scss';

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
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/blog",
        element: <Blog/>,
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
  
     <RouterProvider router={router} />
   
  );
}

export default App;
