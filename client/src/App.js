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
import './assets/style.scss';
import 'react-quill/dist/quill.snow.css';

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
        path: "/create",
        element: <Write/>,
      },
      {
        path: "/article/:id",
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
  
     <RouterProvider router={router} />
   
  );
}

export default App;
