import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useFindGiveaway } from "../hooks/giveaway/useFindGiveaway";
import { useUpdateGiveaway } from "../hooks/giveaway/useUpdateGiveaway";
import { useDeleteGiveaway } from "../hooks/giveaway/useDeleteGiveaway";
import { useDrawGiveaway } from "../hooks/giveaway/useDrawGiveaway";
import { isLogged } from "../lib/isLogged";
import { createUpdateGiveawaySchemaWithSoldEntries, type UpdateGiveawayFormData } from "../schemas/giveaway";
import { useFormValidation } from "../hooks/useFormValidation";

export default function ManageGiveaway() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const id = searchParams.get("id");
	const loggedUser = isLogged();
	const { id: userId } = loggedUser || {};

	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<UpdateGiveawayFormData>({
		id: "",
		title: "",
		description: "",
		entryPrice: 0,
		numEntries: 0,
		imageUrl: "",
	});
	const [serverError, setServerError] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { data: giveaway, isLoading, error: fetchError, refetch } = useFindGiveaway(id || "");
	const updateGiveawayMutation = useUpdateGiveaway();
	const deleteGiveawayMutation = useDeleteGiveaway();
	const drawGiveawayMutation = useDrawGiveaway();

	const soldEntries = giveaway?.soldEntries || 0;
	const totalEntries = giveaway?.numEntries || 0;
	const hasWinner = !!giveaway?.winner;

	const updateSchema = createUpdateGiveawaySchemaWithSoldEntries(soldEntries);

	const { errors, handleSubmit, clearErrors } = useFormValidation({
		schema: updateSchema,
		onSubmit: async (data: UpdateGiveawayFormData) => {
			setServerError("");

			try {
				await updateGiveawayMutation.mutateAsync(data);
				await refetch();
				setIsEditing(false);
				clearErrors();
			} catch (err: any) {
				setServerError(err?.message || "Erro ao atualizar sorteio.");
			}
		},
	});

	useEffect(() => {
		if (giveaway) {
			setFormData({
				id: giveaway.id,
				title: giveaway.title,
				description: giveaway.description,
				entryPrice: giveaway.entryPrice,
				numEntries: giveaway.numEntries,
				imageUrl: giveaway.imageUrl,
			});
		}
	}, [giveaway]);

	if (!id) {
		return <div className="alert alert-danger">ID do sorteio não fornecido</div>;
	}

	if (!userId) {
		return <div className="alert alert-danger">Você precisa estar logado para acessar esta página</div>;
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

	if (fetchError || !giveaway) {
		return (
			<div className="alert alert-danger" role="alert">
				Erro ao carregar sorteio: {fetchError?.message || "Sorteio não encontrado"}
			</div>
		);
	}

	const soldPercentage = Math.floor((soldEntries / totalEntries) * 100);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		const processedValue = type === "number" ? (value === "" ? 0 : Number(value)) : value;

		setFormData((prev) => ({ ...prev, [name]: processedValue }));
		setServerError("");
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setServerError("");
		clearErrors();
		if (giveaway) {
			setFormData({
				id: giveaway.id,
				title: giveaway.title,
				description: giveaway.description,
				entryPrice: giveaway.entryPrice,
				numEntries: giveaway.numEntries,
				imageUrl: giveaway.imageUrl,
			});
		}
	};

	const handleDelete = async () => {
		if (soldEntries > 0) {
			setServerError("Não é possível excluir um sorteio que já possui entradas vendidas.");
			setShowDeleteModal(false);
			return;
		}

		if (hasWinner) {
			setServerError("Não é possível excluir um sorteio que já possui vencedor definido.");
			setShowDeleteModal(false);
			return;
		}

		try {
			await deleteGiveawayMutation.mutateAsync({ id: giveaway.id });
			navigate("/profile", { replace: true });
		} catch (err: any) {
			setServerError(err?.message || "Erro ao excluir sorteio.");
			setShowDeleteModal(false);
		}
	};

	const handleDrawGiveaway = async () => {
		if (hasWinner) {
			setServerError("Este sorteio já possui um vencedor definido.");
			return;
		}

		if (soldEntries === 0) {
			setServerError("Não é possível realizar o sorteio sem entradas vendidas.");
			return;
		}

		try {
			setServerError("");
			await drawGiveawayMutation.mutateAsync({ id: giveaway.id });
			await refetch();
		} catch (err: any) {
			setServerError(err?.message || "Erro ao realizar sorteio.");
		}
	};

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="d-flex justify-content-between align-items-center mb-4">
							<h1>Gerenciar Sorteio</h1>
							<Link to="/profile" className="btn btn-outline-secondary">
								<i className="bi bi-arrow-left me-2"></i>
								Voltar ao Perfil
							</Link>
						</div>

						{serverError && <div className="alert alert-danger">{serverError}</div>}

						<div className="row">
							<div className="col-lg-6">
								<div className="card bg-dark text-light border-secondary mb-4">
									<div className="card-body">
										<h4 className="card-title">Informações do Sorteio</h4>

										{!isEditing ? (
											<>
												<div className="mb-3">
													<img
														src={giveaway.imageUrl}
														className="img-fluid rounded mb-3"
														alt={giveaway.title}
														style={{ maxHeight: "200px", objectFit: "cover" }}
													/>
												</div>
												<h5>{giveaway.title}</h5>
												<p className="text-muted">{giveaway.description}</p>
												<p>
													<strong>Preço por entrada:</strong> R${" "}
													{giveaway.entryPrice.toFixed(2)}
												</p>
												<p>
													<strong>Total de entradas:</strong> {giveaway.numEntries}
												</p>

												<div className="d-flex gap-2">
													<button
														className="btn btn-primary"
														onClick={() => setIsEditing(true)}
														disabled={hasWinner}
													>
														<i className="bi bi-pencil me-2"></i>
														Editar
													</button>
													<button
														className="btn btn-danger"
														onClick={() => setShowDeleteModal(true)}
														disabled={soldEntries > 0 || hasWinner}
													>
														<i className="bi bi-trash me-2"></i>
														Excluir
													</button>
												</div>
												{(soldEntries > 0 || hasWinner) && (
													<small className="text-muted d-block mt-2">
														{hasWinner
															? "* Não é possível editar/excluir sorteio com vencedor definido"
															: "* Não é possível excluir sorteio com entradas vendidas"}
													</small>
												)}
											</>
										) : (
											<form onSubmit={onSubmit}>
												<div className="mb-3">
													<label htmlFor="title" className="form-label">
														Título *
													</label>
													<input
														type="text"
														className={`form-control bg-dark text-light border-secondary ${
															errors.title ? "is-invalid" : ""
														}`}
														id="title"
														name="title"
														value={formData.title}
														onChange={handleInputChange}
														required
													/>
													{errors.title && (
														<div className="invalid-feedback">{errors.title}</div>
													)}
												</div>

												<div className="mb-3">
													<label htmlFor="description" className="form-label">
														Descrição *
													</label>
													<textarea
														className={`form-control bg-dark text-light border-secondary ${
															errors.description ? "is-invalid" : ""
														}`}
														id="description"
														name="description"
														rows={3}
														value={formData.description}
														onChange={handleInputChange}
														required
													/>
													{errors.description && (
														<div className="invalid-feedback">{errors.description}</div>
													)}
												</div>

												<div className="row">
													<div className="col-md-6">
														<div className="mb-3">
															<label htmlFor="entryPrice" className="form-label">
																Preço por entrada *
															</label>
															<input
																type="number"
																step="0.01"
																min="0.01"
																max="1000"
																className={`form-control bg-dark text-light border-secondary ${
																	errors.entryPrice ? "is-invalid" : ""
																}`}
																id="entryPrice"
																name="entryPrice"
																value={formData.entryPrice || ""}
																onChange={handleInputChange}
																required
															/>
															{errors.entryPrice && (
																<div className="invalid-feedback">
																	{errors.entryPrice}
																</div>
															)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3">
															<label htmlFor="numEntries" className="form-label">
																Total de entradas *
																{soldEntries > 0 && (
																	<small className="text-muted">
																		{" "}
																		(mín: {soldEntries})
																	</small>
																)}
															</label>
															<input
																type="number"
																min={soldEntries}
																className={`form-control bg-dark text-light border-secondary ${
																	errors.numEntries ? "is-invalid" : ""
																}`}
																id="numEntries"
																name="numEntries"
																value={formData.numEntries || ""}
																onChange={handleInputChange}
																required
															/>
															{errors.numEntries && (
																<div className="invalid-feedback">
																	{errors.numEntries}
																</div>
															)}
														</div>
													</div>
												</div>

												<div className="mb-3">
													<label htmlFor="imageUrl" className="form-label">
														URL da Imagem *
													</label>
													<input
														type="url"
														className={`form-control bg-dark text-light border-secondary ${
															errors.imageUrl ? "is-invalid" : ""
														}`}
														id="imageUrl"
														name="imageUrl"
														value={formData.imageUrl}
														onChange={handleInputChange}
														required
													/>
													{errors.imageUrl && (
														<div className="invalid-feedback">{errors.imageUrl}</div>
													)}
												</div>

												{formData.imageUrl && (
													<div className="mb-3">
														<img
															src={formData.imageUrl}
															className="img-fluid rounded"
															alt="Preview"
															style={{ maxHeight: "150px", objectFit: "cover" }}
															onError={(e) => {
																(e.target as HTMLImageElement).style.display = "none";
															}}
														/>
													</div>
												)}

												<div className="d-flex gap-2">
													<button
														type="submit"
														className="btn btn-success"
														disabled={updateGiveawayMutation.isPending}
													>
														{updateGiveawayMutation.isPending ? (
															<>
																<span
																	className="spinner-border spinner-border-sm me-2"
																	role="status"
																></span>
																Salvando...
															</>
														) : (
															<>
																<i className="bi bi-check-lg me-2"></i>
																Salvar
															</>
														)}
													</button>
													<button
														type="button"
														className="btn btn-secondary"
														onClick={handleCancelEdit}
													>
														<i className="bi bi-x-lg me-2"></i>
														Cancelar
													</button>
												</div>
											</form>
										)}
									</div>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="card bg-dark text-light border-secondary mb-4">
									<div className="card-body">
										<h4 className="card-title">Estatísticas</h4>

										{/* Status do Sorteio */}
										<div className="mb-4">
											<h6>Status do Sorteio:</h6>
											{hasWinner ? (
												<div className="alert alert-success">
													<i className="bi bi-trophy-fill me-2"></i>
													<strong>Finalizado</strong> - Vencedor já definido
												</div>
											) : soldEntries === 0 ? (
												<div className="alert alert-warning">
													<i className="bi bi-clock me-2"></i>
													<strong>Aguardando</strong> - Nenhuma entrada vendida
												</div>
											) : soldEntries === totalEntries ? (
												<div className="alert alert-info">
													<i className="bi bi-check-circle me-2"></i>
													<strong>Pronto</strong> - Todas as entradas vendidas
												</div>
											) : (
												<div className="alert alert-primary">
													<i className="bi bi-arrow-repeat me-2"></i>
													<strong>Em Andamento</strong> - Sorteio disponível
												</div>
											)}
										</div>

										<div className="row text-center mb-4">
											<div className="col-4">
												<div className="border-secondary border rounded p-3">
													<h2 className="text-primary">{soldEntries}</h2>
													<small className="text-muted">Entradas Vendidas</small>
												</div>
											</div>
											<div className="col-4">
												<div className="border-secondary border rounded p-3">
													<h2 className="text-success">{totalEntries - soldEntries}</h2>
													<small className="text-muted">Disponíveis</small>
												</div>
											</div>
											<div className="col-4">
												<div className="border-secondary border rounded p-3">
													<h2 className="text-info">{soldPercentage}%</h2>
													<small className="text-muted">Vendido</small>
												</div>
											</div>
										</div>

										<div className="mb-3">
											<h6>Progresso de Vendas:</h6>
											<div className="progress bg-secondary" style={{ height: "20px" }}>
												<div
													className="progress-bar bg-primary"
													role="progressbar"
													style={{ width: `${soldPercentage}%` }}
													aria-valuenow={soldPercentage}
													aria-valuemin={0}
													aria-valuemax={100}
												>
													{soldPercentage}%
												</div>
											</div>
										</div>

										<div className="mb-3">
											<h6>Data de Criação:</h6>
											<p className="text-muted">
												{new Date(giveaway.createdAt).toLocaleDateString("pt-BR", {
													day: "2-digit",
													month: "2-digit",
													year: "numeric",
													hour: "2-digit",
													minute: "2-digit",
												})}
											</p>
										</div>

										<div className="mb-3">
											<h6>Receita Atual:</h6>
											<p className="text-success fs-5">
												R$ {(soldEntries * giveaway.entryPrice).toFixed(2)}
											</p>
										</div>

										<div className="mb-3">
											<h6>Receita Potencial:</h6>
											<p className="text-info">
												R$ {(totalEntries * giveaway.entryPrice).toFixed(2)}
											</p>
										</div>

										{hasWinner && (
											<div className="mb-3">
												<h6>
													<i className="bi bi-trophy-fill text-warning me-2"></i>
													Vencedor:
												</h6>
												<div className="alert alert-success">
													<strong>{giveaway.winner?.name}</strong>
													<br />
													<small className="text-muted">{giveaway.winner?.email}</small>
													{giveaway.luckyNumber && (
														<>
															<br />
															<small>Número da sorte: {giveaway.luckyNumber}</small>
														</>
													)}
												</div>
											</div>
										)}
									</div>
								</div>

								<div className="card bg-dark text-light border-secondary">
									<div className="card-body">
										<h4 className="card-title">Ações Rápidas</h4>
										<div className="d-grid gap-2">
											{!hasWinner && soldEntries > 0 && (
												<button
													className="btn btn-warning"
													onClick={handleDrawGiveaway}
													disabled={drawGiveawayMutation.isPending}
												>
													{drawGiveawayMutation.isPending ? (
														<>
															<span
																className="spinner-border spinner-border-sm me-2"
																role="status"
															></span>
															Realizando Sorteio...
														</>
													) : (
														<>
															<i className="bi bi-trophy me-2"></i>
															Realizar Sorteio
														</>
													)}
												</button>
											)}
											<Link
												to={`/giveaway?id=${giveaway.id}`}
												className="btn btn-outline-primary"
											>
												<i className="bi bi-eye me-2"></i>
												Ver Página Pública
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal de Confirmação de Exclusão */}
			{showDeleteModal && (
				<div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
					<div className="modal-dialog">
						<div className="modal-content bg-dark text-light border-secondary">
							<div className="modal-header border-secondary">
								<h5 className="modal-title">Confirmar Exclusão</h5>
								<button
									type="button"
									className="btn-close btn-close-white"
									onClick={() => setShowDeleteModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<p>
									Tem certeza que deseja excluir o sorteio <strong>"{giveaway.title}"</strong>?
								</p>
								<p className="text-warning">
									<i className="bi bi-exclamation-triangle me-2"></i>
									Esta ação não pode ser desfeita.
								</p>
							</div>
							<div className="modal-footer border-secondary">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setShowDeleteModal(false)}
								>
									Cancelar
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={handleDelete}
									disabled={deleteGiveawayMutation.isPending}
								>
									{deleteGiveawayMutation.isPending ? (
										<>
											<span
												className="spinner-border spinner-border-sm me-2"
												role="status"
											></span>
											Excluindo...
										</>
									) : (
										<>
											<i className="bi bi-trash me-2"></i>
											Excluir
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
