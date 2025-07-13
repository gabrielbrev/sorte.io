import { Link, useSearchParams } from "react-router-dom";
import { useFindAllGiveaways } from "../hooks/giveaway/useFindAllGiveaways";
import { GiveawayCard } from "../components/GiveawayCard";

export default function Home() {
	const [searchParams] = useSearchParams();
	const { data: giveaways, isLoading, error } = useFindAllGiveaways();

	const page = Number(searchParams.get("page")) || 0;
	const itemsPerPage = 3;

	// Implementar paginação localmente
	const startIndex = page * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedGiveaways = giveaways?.slice(startIndex, endIndex) || [];
	const totalPages = Math.ceil((giveaways?.length || 0) / itemsPerPage);

	function getPagination(page: number, numPages: number) {
		const length = 3;

		const end = Math.min(numPages, page + length - 1);
		const start = Math.max(0, end - length);

		return Array.from({ length: length }, (_, i) => i + start);
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

	if (error) {
		return (
			<div className="alert alert-danger" role="alert">
				Erro ao carregar sorteios: {error.message}
			</div>
		);
	}

	return (
		<>
			<h1 className="mb-4">Sorteios Ativos</h1>
			<div className="d-flex flex-column align-items-center">
				{paginatedGiveaways.map((g) => (
					<GiveawayCard
						id={g.id}
						imageUrl={g.imageUrl}
						title={g.title}
						description={g.description}
						entryPrice={g.entryPrice}
						createdAt={g.createdAt}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<nav className="mt-5" aria-label="Page navigation example">
					<ul
						className="pagination justify-content-center"
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "instant" });
						}}
					>
						<li className={`page-item ${page === 0 ? "disabled" : ""}`}>
							<Link className="page-link" to={`?page=${page - 1}`} aria-label="Previous">
								<i className="bi bi-chevron-left"></i>
							</Link>
						</li>

						{getPagination(page, totalPages).map((n) => (
							<li key={n} className={`page-item ${page === n ? "active" : ""}`}>
								<Link className="page-link" to={`?page=${n}`}>
									{n + 1}
								</Link>
							</li>
						))}

						<li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
							<Link className="page-link" to={`?page=${page + 1}`} aria-label="Next">
								<i className="bi bi-chevron-right"></i>
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
}
