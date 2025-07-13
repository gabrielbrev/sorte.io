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
		<>
			<h1 className="mb-4">Ganhadores Recentes</h1>

			{giveaways && giveaways.length > 0 ? (
				<table className="table table-dark table-bordered text-light align-middle">
					<thead>
						<tr>
							<th>Sorteio</th>
							<th>Ganhador</th>
							<th>Número da Sorte</th>
							<th>Prêmio</th>
						</tr>
					</thead>
					<tbody>
						{giveaways.map((g) => (
							<tr key={g.id}>
								<td>{g.title}</td>
								<td>{g.winner?.name || "Não definido"}</td>
								<td>#{g.luckyNumber || Math.floor(Math.random() * g.numEntries) + 1}</td>
								<td style={{ width: "130px", height: "130px" }}>
									<img
										src={g.imageUrl}
										className="img-fluid rounded"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
										alt={g.title}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="alert alert-info" role="alert">
					Nenhum sorteio finalizado encontrado.
				</div>
			)}
		</>
	);
}
