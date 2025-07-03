import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isLogged } from "../lib/isLogged";
import { getCartItemCount } from "../utils/cart";

export function NavBar() {
	const location = useLocation();
	const [cartItemCount, setCartItemCount] = useState(0);

	const pages = [
		{ href: "/", name: "Início" },
		{ href: "/winners", name: "Ganhadores" },
		isLogged() ? { href: "/profile", name: "Meu Perfil" } : { href: "/login", name: "Login" },
	];

	const [hide, setHide] = useState<boolean>(false);

	function isActive(href: string) {
		return location.pathname === href ? "active" : "";
	}

	useEffect(() => {
		const updateCartCount = () => {
			setCartItemCount(getCartItemCount());
		};

		updateCartCount();

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "sorteio_cart") {
				updateCartCount();
			}
		};

		const handleCartUpdate = () => {
			updateCartCount();
		};

		window.addEventListener("storage", handleStorageChange);
		window.addEventListener("cartUpdated", handleCartUpdate);

		const intervalId = setInterval(updateCartCount, 500);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("cartUpdated", handleCartUpdate);
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 80) {
				setHide(true);
			} else {
				setHide(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className="navbar navbar-expand-lg bg-dark sticky-top navbar-dark"
			style={{
				transform: hide ? "translateY(-100%)" : "translateY(0)",
				transition: "transform 0.3s ease-in-out",
			}}
		>
			<div className="container">
				<Link className="navbar-brand text-light" to="/">
					<div className="d-flex flex-row align-items-center justify-content-center">
						<img src="../../public/icon.png" alt="sorte.io" height={30} />
						<span>Sorte.io</span>
					</div>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						{pages.map((p, i) => (
							<li className="nav-item" key={i}>
								<Link className={`nav-link ${isActive(p.href)}`} to={p.href}>
									{p.name}
								</Link>
							</li>
						))}
						<li className="nav-item">
							<Link className={`nav-link position-relative ${isActive("/cart")}`} to="/cart">
								<i className="bi bi-cart3 fs-5"></i>
								{cartItemCount > 0 && (
									<span
										className="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-danger"
										style={{ fontSize: "0.75rem" }}
									>
										{cartItemCount > 99 ? "99+" : cartItemCount}
									</span>
								)}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
