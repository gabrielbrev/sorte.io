import { Link, useSearchParams } from "react-router-dom";
import { getGiveaways } from "../utils/giveaway";

export default function Home() {
	const [searchParams] = useSearchParams();

	const page = Number(searchParams.get("page"));

	const giveaways = getGiveaways(page, 3);

	function getPagination(page: number, numPages: number) {
		const length = 3;

		const end = Math.min(numPages, page + length - 1);
		const start = Math.max(0, end - length);

		return Array.from({ length: length }, (_, i) => i + start);
	}

	return (
		<>
			<h1 className="mb-4">Sorteios Ativos</h1>
			<div className="d-flex flex-column align-items-center">
				{giveaways.items.map((g) => (
					<div className="card mb-3 bg-dark text-light border-secondary" style={{ width: "600px" }}>
						<img
							src={g.image}
							className="card-img-top img-fluid object-fit-cover"
							style={{ height: "300px" }}
							alt={g.title}
						/>
						<div className="card-body">
							<h5 className="card-title">{g.title}</h5>
							<p className="card-text">{g.description}</p>
							<div className="d-flex justify-content-center">
								<Link to={`/giveaway?id=${g.id}`} className="btn btn-primary">
									Participar Agora
								</Link>
							</div>
							<p className="card-text">
								<small className="text-secondary">Atualizado há X minutos</small>
							</p>
						</div>
					</div>
				))}
			</div>

			<nav className="mt-5" aria-label="Page navigation example">
				<ul
					className="pagination justify-content-center"
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "instant" });
					}}
				>
					<li className={`page-item ${page === 0 ? "disabled" : ""}`}>
						<Link className="page-link" to={`?page=${page - 1}`} aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</Link>
					</li>

					{getPagination(page, giveaways.numPages).map((n) => (
						<li className={`page-item ${page === n ? "active" : ""}`}>
							<Link className="page-link" to={`?page=${n}`}>
								{n + 1}
							</Link>
						</li>
					))}

					<li className={`page-item ${page === giveaways.numPages - 1 ? "disabled" : ""}`}>
						<Link className="page-link" to={`?page=${page + 1}`} aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
