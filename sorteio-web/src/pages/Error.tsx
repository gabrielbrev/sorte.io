import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export default function Error() {
	const error = useRouteError();

	return (
		<>
			<NavBar />
			<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
				<div className="text-center">
					<div className="card bg-dark text-light border-secondary shadow-sm" style={{ minWidth: "400px" }}>
						<div className="card-body p-5">
							<div className="text-danger mb-3">
								<i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "3rem" }}></i>
							</div>
							<h4 className="card-title text-danger mb-3">Ops! Algo deu errado</h4>
							<div className="alert alert-dark border-secondary mb-4">
								<small className="text-muted">
									{isRouteErrorResponse(error)
										? "Página requisitada inválida"
										: error && typeof error === "object" && "message" in error
											? (error as Error).message
											: "Erro desconhecido"}
								</small>
							</div>
							<Link to="/" className="btn btn-primary">
								<i className="bi bi-house-fill me-2"></i>
								Voltar ao Início
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
