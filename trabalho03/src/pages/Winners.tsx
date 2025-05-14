import { getFinishedGiveaways } from "../utils/giveaway";

export default function Winners() {
	const giveaways = getFinishedGiveaways();

	return (
		<>
			<h1 className="mb-4">Ganhadores Recentes</h1>

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
						<tr>
							<td>{g.title}</td>
							<td>{g.winnerId}</td>
							<td>#{g.luckyNumber}</td>
							<td style={{ width: "130px", height: "130px" }}>
								<img
									src={g.image}
									className="img-fluid rounded"
									style={{ width: "100%", height: "100%", objectFit: "cover" }}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
