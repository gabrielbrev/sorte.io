import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Winners from "../pages/Winners";
import Giveaway from "../pages/Giveaway";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "profile", element: <Profile /> },
			{ path: "giveaway", element: <Giveaway /> },
			{ path: "winners", element: <Winners /> },
		],
	},
]);
export default router;
