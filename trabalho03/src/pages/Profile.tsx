import { Link } from "react-router-dom";
import { useFindUser } from "../hooks/user/useFindUser";
import { isLogged } from "../lib/isLogged";

export default function Profile() {
	const loggedUser = isLogged();
	const { id: userId } = loggedUser || {};
	const { data: user, isLoading, error } = useFindUser(userId || "");

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
			<div className="alert alert-danger" role="alert">
				Erro ao carregar perfil: {error?.message || "Usuário não encontrado"}
			</div>
		);
	}

	const owned = user.ownedGiveaways;

	return (
		<>
			<h1 className="mb-4">Meu Perfil</h1>

			<div className="card mb-4 text-light bg-dark border-secondary">
				<div className="card-body">
					<h4 className="card-title">{user.name}</h4>
					<p className="card-text">
						{user.email}
						<br />
						{user.name}
					</p>
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
