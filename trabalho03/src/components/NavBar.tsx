import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function NavBar() {
	const location = useLocation();

	const pages = [
		{ href: "/", name: "Início" },
		{ href: "/profile", name: "Meu Perfil" },
		{ href: "/winners", name: "Ganhadores" },
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
						<img src="../../public/icon.png" alt="sorte.io" height={30} />
						<span>Sorte.io</span>
					</div>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						{pages.map((p) => (
							<li className="nav-item">
								<Link className={`nav-link ${isActive(p.href)}`} to={p.href}>
									{p.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}
