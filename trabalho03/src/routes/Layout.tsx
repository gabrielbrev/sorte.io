import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const Layout = () => {
	return (
		<div className="text-light" data-bs-theme="dark">
			<NavBar />
			<div className="container my-3">
				<Outlet />
			</div>
		</div>
	);
};
export default Layout;
