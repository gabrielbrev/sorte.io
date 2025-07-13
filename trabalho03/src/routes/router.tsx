import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Winners from "../pages/Winners";
import Giveaway from "../pages/Giveaway";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateGiveaway from "../pages/CreateGiveaway";
import ManageGiveaway from "../pages/ManageGiveaway";
import ShoppingCart from "../pages/ShoppingCart";
import Favorites from "../pages/Favorites";
import { PrivateRoutes } from "./PrivateRoutes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "giveaway", element: <Giveaway /> },
			{ path: "winners", element: <Winners /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
		],
	},
	{
		path: "/",
		element: <PrivateRoutes />,
		children: [
			{ path: "profile", element: <Profile /> },
			{ path: "create-giveaway", element: <CreateGiveaway /> },
			{ path: "manage-giveaway", element: <ManageGiveaway /> },
			{ path: "cart", element: <ShoppingCart /> },
			{ path: "favorites", element: <Favorites /> },
		],
	},
]);
export default router;
