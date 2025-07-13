import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateGiveaway } from "../hooks/giveaway/useCreateGiveaway";
import { isLogged } from "../lib/isLogged";
import { createGiveawaySchema, type CreateGiveawayFormData } from "../schemas/giveaway";
import { useFormValidation } from "../hooks/useFormValidation";

export default function CreateGiveaway() {
	const [formData, setFormData] = useState<CreateGiveawayFormData>({
		title: "",
		description: "",
		entryPrice: 0,
		numEntries: 0,
		imageUrl: "",
	});
	const [serverError, setServerError] = useState("");
	const navigate = useNavigate();
	const loggedUser = isLogged();
	const { id: userId } = loggedUser || {};
	const createGiveawayMutation = useCreateGiveaway();

	const { errors, handleSubmit } = useFormValidation({
		schema: createGiveawaySchema,
		onSubmit: async (data: CreateGiveawayFormData) => {
			setServerError("");

			if (!userId) {
				setServerError("Você precisa estar logado para criar um sorteio.");
				return;
			}

			try {
				const giveawayPayload = {
					...data,
					owner: {
						id: userId,
					},
				};

				await createGiveawayMutation.mutateAsync(giveawayPayload);
				navigate("/profile", { replace: true });
			} catch (err: any) {
				setServerError(err?.message || "Erro ao criar sorteio.");
			}
		},
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		const processedValue = type === "number" ? (value === "" ? 0 : Number(value)) : value;

		setFormData((prev) => ({ ...prev, [name]: processedValue }));
		setServerError(""); // Limpa erro do servidor quando o usuário digita
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	return (
		<div className="container-fluid">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<div className="card bg-dark text-light border-secondary">
						<div className="card-body">
							<h2 className="card-title mb-4 text-center">Criar Novo Sorteio</h2>
							<form onSubmit={onSubmit}>
								<div className="mb-3">
									<label htmlFor="title" className="form-label">
										Título do Sorteio *
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
										placeholder="Ex: Smartphone Galaxy S24"
										required
										autoFocus
									/>
									{errors.title && <div className="invalid-feedback">{errors.title}</div>}
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
										placeholder="Ex: Participe e concorra a um Galaxy S24 novinho!"
										required
									/>
									{errors.description && <div className="invalid-feedback">{errors.description}</div>}
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="entryPrice" className="form-label">
												Preço da Entrada (R$) *
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
												placeholder="10.00"
												required
											/>
											{errors.entryPrice && (
												<div className="invalid-feedback">{errors.entryPrice}</div>
											)}
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="numEntries" className="form-label">
												Número de Entradas * (máx. 10.000)
											</label>
											<input
												type="number"
												min="1"
												max="10000"
												className={`form-control bg-dark text-light border-secondary ${
													errors.numEntries ? "is-invalid" : ""
												}`}
												id="numEntries"
												name="numEntries"
												value={formData.numEntries || ""}
												onChange={handleInputChange}
												placeholder="1000"
												required
											/>
											{errors.numEntries && (
												<div className="invalid-feedback">{errors.numEntries}</div>
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
										placeholder="https://example.com/imagens/galaxy-s24.png"
										required
									/>
									{errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
								</div>

								{formData.imageUrl && (
									<div className="mb-3">
										<label className="form-label">Preview da Imagem:</label>
										<div className="text-center">
											<img
												src={formData.imageUrl}
												alt="Preview"
												className="img-fluid rounded"
												style={{ maxHeight: "200px", objectFit: "cover" }}
												onError={(e) => {
													const target = e.target as HTMLImageElement;
													target.style.display = "none";
												}}
											/>
										</div>
									</div>
								)}

								{serverError && <div className="alert alert-danger py-2">{serverError}</div>}

								<div className="d-grid gap-2">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={createGiveawayMutation.isPending}
									>
										{createGiveawayMutation.isPending ? (
											<>
												<span
													className="spinner-border spinner-border-sm me-2"
													role="status"
													aria-hidden="true"
												></span>
												Criando...
											</>
										) : (
											<>
												<i className="bi bi-plus-circle me-2"></i>
												Criar Sorteio
											</>
										)}
									</button>
									<button
										type="button"
										className="btn btn-outline-secondary"
										onClick={() => navigate("/profile")}
										disabled={createGiveawayMutation.isPending}
									>
										<i className="bi bi-x-circle me-2"></i>
										Cancelar
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
