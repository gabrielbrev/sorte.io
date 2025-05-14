import { Link, redirect, useSearchParams } from "react-router-dom";
import { getGiveaway } from "../utils/giveaway";
import { useEffect } from "react";
import Toast from "bootstrap/js/dist/toast";

export default function Giveaway() {
	const [searchParams] = useSearchParams();

	const id = searchParams.get("id");

	useEffect(() => {
		const toastTrigger = document.getElementById("liveToastBtn");
		const toastLiveExample = document.getElementById("liveToast");

		if (toastTrigger && toastLiveExample) {
			const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
			toastTrigger.addEventListener("click", () => {
				toastBootstrap.show();
			});
		}
	}, []);

	if (!id) {
		redirect("/404");
		return;
	}

	const giveaway = getGiveaway(id);
	const soldPercentage = Math.floor((giveaway.soldEntries / giveaway.totalEntries) * 100);
	const availableEntries = giveaway.totalEntries - giveaway.soldEntries;

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<>
			<div className="d-flex justify-content-end">
				<Link className="btn-close btn-close-white" aria-label="Close" to="/" />
			</div>
			<div className="row">
				<div className="container col-md-6" style={{ width: "50%" }}>
					<img
						src={giveaway.image}
						className="rounded"
						style={{ objectFit: "cover", width: "100%" }}
						alt={giveaway.title}
					/>
				</div>

				<div className="col-md-6">
					<h2>{giveaway.title}</h2>
					<p>{giveaway.description}</p>
					<p>
						<strong>Entradas já vendidas:</strong> {giveaway.soldEntries} / {giveaway.totalEntries}
					</p>

					<form onSubmit={handleSubmit}>
						<label htmlFor="entryCount" className="form-label">
							Quantidade de entradas
						</label>
						<input
							type="number"
							className="form-control mb-3 bg-dark text-light border-secondary"
							id="entryCount"
							min="1"
							max={availableEntries}
							value={Math.min(Math.ceil(giveaway.totalEntries * 0.01), availableEntries)}
						/>
						<button id="liveToastBtn" type="submit" className="btn btn-primary">
							Participar Agora
						</button>
					</form>

					<div className="mt-4">
						<h5>Progresso:</h5>
						<div className="progress bg-secondary">
							<div className="progress-bar bg-primary" style={{ width: `${soldPercentage}%` }}>
								{soldPercentage}%
							</div>
						</div>
					</div>

					<div className="mt-4">
						<h5>Dono do sorteio:</h5>
						<p>{giveaway.ownerId}</p>
					</div>
				</div>
			</div>

			<div className="toast-container position-fixed bottom-0 end-0 p-3">
				<div
					id="liveToast"
					className="toast border-secondary"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<div className="toast-header bg-dark text-light border-secondary">
						<strong className="me-auto">Boa sorte!</strong>
						<button
							type="button"
							className="btn-close btn-close-white"
							data-bs-dismiss="toast"
							aria-label="Close"
						></button>
					</div>
					<div className="toast-body bg-dark text-light border-secondary rounded-bottom">
						Você está participando do sorteio.
					</div>
				</div>
			</div>
		</>
	);
}
