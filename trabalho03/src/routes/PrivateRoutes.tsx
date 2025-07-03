import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import { isLogged } from "../lib/isLogged";

export const PrivateRoutes = () => {
	if (isLogged()) {
		return <Layout />;
	} else {
		return <Navigate to="/login" state={{ destination: location.pathname }} />;
	}
};
