import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { isLogged } from "../lib/isLogged";
import { useCart } from "../hooks/useCart";

export function NavBar() {
	const location = useLocation();
	const { itemCount } = useCart();

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
						<img src="/icon.png" alt="sorte.io" height={30} />
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
						{isLogged() && (
							<li className="nav-item">
								<Link className={`nav-link ${isActive("/favorites")}`} to="/favorites">
									<span className="d-lg-none">Favoritos</span>
									<i className="bi bi-heart fs-5 d-none d-lg-inline"></i>
								</Link>
							</li>
						)}
						<li className="nav-item">
							<Link className={`nav-link position-relative ${isActive("/cart")}`} to="/cart">
								<span className="d-lg-none">
									Carrinho
									{itemCount > 0 && ` (${itemCount > 99 ? "99+" : itemCount})`}
								</span>
								<span className="position-relative d-none d-lg-inline">
									<i className="bi bi-cart3 fs-5"></i>
									{itemCount > 0 && (
										<span
											className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-flex align-items-center justify-content-center"
											style={{
												fontSize: "0.65rem",
												minWidth: "1rem",
												height: "1rem",
											}}
										>
											{itemCount > 99 ? "99+" : itemCount}
										</span>
									)}
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
