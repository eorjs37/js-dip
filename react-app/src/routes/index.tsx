import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../views/Home";
import About from "../views/About";
import User from "../views/User";

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
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
