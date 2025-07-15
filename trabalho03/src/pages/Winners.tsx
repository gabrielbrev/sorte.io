import { useFindEndedGiveaways } from "../hooks/giveaway/useFindEndedGiveaways";

export default function Winners() {
	const { data: giveaways, isLoading, error } = useFindEndedGiveaways();

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-border text-light" role="status">
					<span className="visually-hidden">Carregando...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="alert alert-danger" role="alert">
				Erro ao carregar os ganhadores: {error.message}
			</div>
		);
	}

	return (
		<div className="container-fluid px-4">
			{/* Header Section */}
			<div className="text-center mb-5">
				<h1 className="display-4 fw-bold text-warning mb-3">🏆 Ganhadores Recentes</h1>
				<p className="lead text-light opacity-75">Confira os sortudos que levaram os melhores prêmios!</p>
			</div>

			{giveaways && giveaways.length > 0 ? (
				<div className="row g-4">
					{giveaways.map((g, index) => (
						<div key={g.id} className="col-lg-6 col-xl-4">
							<div className="card bg-dark border-warning h-100 shadow-lg">
								<div className="position-relative">
									<img
										src={g.imageUrl}
										className="card-img-top"
										style={{
											height: "200px",
											objectFit: "cover",
										}}
										alt={g.title}
									/>
									<div className="position-absolute top-0 end-0 m-3">
										<span className="badge bg-warning text-dark fs-6 px-3 py-2">#{index + 1}</span>
									</div>
								</div>

								<div className="card-body d-flex flex-column">
									<h5 className="card-title text-warning fw-bold mb-3">{g.title}</h5>

									<div className="mb-3">
										<div className="d-flex align-items-center mb-2">
											<i className="bi bi-trophy-fill text-warning me-2"></i>
											<span className="text-light fw-semibold">Ganhador:</span>
										</div>
										<p className="text-light fs-5 mb-0 ms-4">{g.winner?.name || "Não definido"}</p>
									</div>

									<div className="mb-3">
										<div className="d-flex align-items-center mb-2">
											<i className="bi bi-dice-5-fill text-warning me-2"></i>
											<span className="text-light fw-semibold">Número da Sorte:</span>
										</div>
										<span className="badge bg-gradient bg-success fs-6 ms-4 px-3 py-2">
											#{g.luckyNumber || Math.floor(Math.random() * g.numEntries) + 1}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-5">
					<div className="mb-4">
						<i className="bi bi-search text-warning" style={{ fontSize: "4rem" }}></i>
					</div>
					<h3 className="text-light mb-3">Nenhum ganhador ainda</h3>
					<p className="text-light opacity-75 mb-4">
						Os sorteios ainda não foram finalizados ou não há ganhadores para exibir.
					</p>
					<div
						className="alert alert-info border-0 bg-gradient"
						style={{
							background: "linear-gradient(45deg, #17a2b8, #6610f2)",
						}}
					>
						<i className="bi bi-info-circle me-2"></i>
						Volte mais tarde para conferir os próximos ganhadores!
					</div>
				</div>
			)}
		</div>
	);
}
