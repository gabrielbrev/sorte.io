import { Link } from "react-router-dom";
import { getEnteredGiveaways, getOwnedGiveaways } from "../utils/giveaway";

export default function Profile() {
	const user = {
		id: "user_456",
		fullname: "Gabriel Brevilieri",
		email: "gbrevilieri.dev@gmail.com",
		username: "gabrielbrev",
		phoneNumber: "(21) 99775-0450",
	};

	const entered = getEnteredGiveaways(user.id);
	const owned = getOwnedGiveaways(user.id);

	return (
		<>
			<h1 className="mb-4">Meu Perfil</h1>

			<div className="card mb-4 text-light bg-dark border-secondary">
				<div className="card-body">
					<h4 className="card-title">{user.fullname}</h4>
					<p className="card-text">
						{user.email}
						<br />
						{user.username}
						<br />
						{user.phoneNumber}
					</p>
				</div>
			</div>

			<h3>Sorteios Participando</h3>
			<ul className="list-group mb-4">
				{entered.map((g) => (
					<li className="list-group-item d-flex justify-content-between align-items-center text-light bg-dark border-secondary">
						{g.title}
						<span className="badge bg-success">{g.myEntries} entradas</span>
					</li>
				))}
			</ul>

			<h3>Meus Sorteios</h3>
			<ul className="list-group">
				{owned.map((g) => (
					<li className="list-group-item d-flex justify-content-between align-items-center text-light bg-dark border-secondary">
						{g.title}
						<Link to={`/giveaway?id=${g.id}`} className="btn btn-sm btn-outline-primary">
							Ver
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
