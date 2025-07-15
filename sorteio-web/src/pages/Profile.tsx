import { Link, useNavigate } from "react-router-dom";
import { useFindUser } from "../hooks/user/useFindUser";
import { isLogged } from "../lib/isLogged";
import { logout } from "../lib/logout";

export default function Profile() {
	const navigate = useNavigate();
	const loggedUser = isLogged();
	const { id: userId } = loggedUser || {};
	const { data: user, isLoading, error } = useFindUser(userId || "");

	function handleLogout() {
		logout();
		navigate("/");
	}

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Carregando...</span>
				</div>
			</div>
		);
	}

	if (error || !user) {
		return (
			<>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h1>Meu Perfil</h1>
					<button className="btn btn-outline-danger" onClick={handleLogout}>
						<i className="bi bi-box-arrow-right me-2"></i>
						Logout
					</button>
				</div>
				<div className="alert alert-danger" role="alert">
					Erro ao carregar perfil: {error?.message || "Usuário não encontrado"}
				</div>
			</>
		);
	}

	const owned = user.ownedGiveaways;

	return (
		<>
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h1>Meu Perfil</h1>
				<button className="btn btn-outline-danger" onClick={handleLogout}>
					<i className="bi bi-box-arrow-right me-2"></i>
					Logout
				</button>
			</div>

			<div className="card mb-4 text-light bg-dark border-secondary">
				<div className="card-body">
					<div className="d-flex align-items-center mb-3">
						<div
							className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
							style={{ width: "60px", height: "60px" }}
						>
							<i className="bi bi-person-fill fs-4 text-white"></i>
						</div>
						<div className="flex-grow-1">
							<h4 className="card-title mb-1">{user.name}</h4>
							<p className="text-muted mb-0">
								<i className="bi bi-envelope me-2"></i>
								{user.email}
							</p>
						</div>
					</div>

					<div className="row text-center">
						<div className="col-4">
							<div className="border-end border-secondary px-2">
								<i className="bi bi-gift text-primary fs-4 d-block mb-1"></i>
								<div className="fs-5 fw-bold text-primary">{user.ownedGiveaways?.length || 0}</div>
								<small className="text-muted">Sorteios Criados</small>
							</div>
						</div>
						<div className="col-4">
							<div className="border-end border-secondary px-2">
								<i className="bi bi-ticket-perforated text-info fs-4 d-block mb-1"></i>
								<div className="fs-5 fw-bold text-info">{user.participatingGiveaways?.length || 0}</div>
								<small className="text-muted">Participações</small>
							</div>
						</div>
						<div className="col-4">
							<div className="px-2">
								<i className="bi bi-trophy text-warning fs-4 d-block mb-1"></i>
								<div className="fs-5 fw-bold text-warning">{user.wonGiveaways?.length || 0}</div>
								<small className="text-muted">Vitórias</small>
							</div>
						</div>
					</div>
				</div>
			</div>

			{user.participatingGiveaways && user.participatingGiveaways.length > 0 && (
				<>
					<h3 className="mb-3">Sorteios Participando</h3>
					<ul className="list-group mb-4">
						{user.participatingGiveaways.map((g) => {
							return (
								<li
									key={g.id}
									className="list-group-item d-flex justify-content-between align-items-center text-light bg-dark border-secondary"
								>
									<div>
										<h6 className="mb-1">{g.title}</h6>
										<small className="text-muted">
											Preço por entrada: R$ {g.entryPrice.toFixed(2)}
										</small>
									</div>
								</li>
							);
						})}
					</ul>
				</>
			)}

			{user.wonGiveaways && user.wonGiveaways.length > 0 && (
				<>
					<h3 className="mb-3">
						<i className="bi bi-trophy-fill text-warning me-2"></i>
						Sorteios Ganhos
					</h3>
					<ul className="list-group mb-4">
						{user.wonGiveaways.map((g) => (
							<li
								key={g.id}
								className="list-group-item d-flex justify-content-between align-items-center text-light bg-success border-success"
							>
								<div>
									<h6 className="mb-1">{g.title}</h6>
									<small className="text-light">Parabéns! Você ganhou este sorteio!</small>
								</div>
								<span className="badge bg-warning text-dark">
									<i className="bi bi-trophy-fill"></i> Vencedor
								</span>
							</li>
						))}
					</ul>
				</>
			)}

			<div className="d-flex justify-content-between align-items-center mb-3">
				<h3>Meus Sorteios</h3>
				<Link to="/create-giveaway" className="btn btn-primary">
					<i className="bi bi-plus-circle me-2"></i>
					Criar Novo Sorteio
				</Link>
			</div>
			<ul className="list-group">
				{owned.map((g) => (
					<li
						key={g.id}
						className="list-group-item d-flex justify-content-between align-items-center text-light bg-dark border-secondary"
					>
						<div>
							<h6 className="mb-1">{g.title}</h6>
							<small className="text-muted">
								{g.soldEntries} / {g.numEntries} entradas vendidas
							</small>
						</div>
						<div className="btn-group" role="group">
							<Link to={`/giveaway?id=${g.id}`} className="btn btn-sm btn-outline-info">
								<i className="bi bi-eye me-1"></i>
								Ver
							</Link>
							<Link to={`/manage-giveaway?id=${g.id}`} className="btn btn-sm btn-outline-primary">
								<i className="bi bi-gear me-1"></i>
								Gerenciar
							</Link>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
