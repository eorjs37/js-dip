import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../views/Home";
import About from "../views/About";
import User from "../views/User";
import Login from "../views/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Home />,
  },
  {
    path: "/about",
    Component: () => <About />,
  },
  {
    path: "/user",
    Component: () => <User />,
  },
  {
    path: "/login",
    Component: () => <Login />,
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
