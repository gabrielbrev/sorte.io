import { Link, useSearchParams, Navigate, useNavigate } from "react-router-dom";
import { useFindGiveaway } from "../hooks/giveaway/useFindGiveaway";
import { useState } from "react";
import { isLogged } from "../lib/isLogged";
import Toast from "bootstrap/js/dist/toast";
import { createJoinGiveawaySchemaWithAvailableEntries, type JoinGiveawayFormData } from "../schemas/giveaway";
import { useFormValidation } from "../hooks/useFormValidation";
import { addItemToCart } from "../utils/cart";
import type { CartItem } from "../interfaces/CartItem";

export default function Giveaway() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const id = searchParams.get("id");
	const [formData, setFormData] = useState<JoinGiveawayFormData>({
		entryCount: 1,
	});
	const [serverError, setServerError] = useState("");
	const loggedUser = isLogged();
	const { id: userId } = loggedUser || {};

	const { data: giveaway, isLoading, error: fetchError } = useFindGiveaway(id || "");

	const soldEntries = giveaway?.soldEntries || 0;
	const totalEntries = giveaway?.numEntries || 0;
	const availableEntries = totalEntries - soldEntries;
	const hasWinner = !!giveaway?.winner;
	const isCurrentUserWinner = hasWinner && userId && giveaway?.winner?.id === userId;

	// Cria um schema dinâmico com base nas entradas disponíveis
	const joinSchema = createJoinGiveawaySchemaWithAvailableEntries(availableEntries);

	const addToCartOnly = async (data: JoinGiveawayFormData) => {
		setServerError("");

		if (!giveaway) {
			setServerError("Sorteio não encontrado.");
			return;
		}

		try {
			const cartItem: CartItem = {
				giveawayId: giveaway.id,
				title: giveaway.title,
				imageUrl: giveaway.imageUrl,
				entryPrice: giveaway.entryPrice,
				entryCount: data.entryCount,
				totalPrice: data.entryCount * giveaway.entryPrice,
			};

			addItemToCart(cartItem);

			const toastElement = document.getElementById("addToCartToast");
			if (toastElement) {
				const toast = Toast.getOrCreateInstance(toastElement);
				toast.show();
			}
		} catch (err: any) {
			setServerError(err?.message || "Erro ao adicionar ao carrinho.");
		}
	};

	const addToCartAndRedirect = async (data: JoinGiveawayFormData) => {
		setServerError("");

		if (!giveaway) {
			setServerError("Sorteio não encontrado.");
			return;
		}

		try {
			const cartItem: CartItem = {
				giveawayId: giveaway.id,
				title: giveaway.title,
				imageUrl: giveaway.imageUrl,
				entryPrice: giveaway.entryPrice,
				entryCount: data.entryCount,
				totalPrice: data.entryCount * giveaway.entryPrice,
			};

			addItemToCart(cartItem);

			const toastElement = document.getElementById("participateToast");
			if (toastElement) {
				const toast = Toast.getOrCreateInstance(toastElement);
				toast.show();
			}

			setTimeout(() => {
				navigate("/cart");
			}, 1500);
		} catch (err: any) {
			setServerError(err?.message || "Erro ao adicionar ao carrinho.");
		}
	};

	const { errors, handleSubmit } = useFormValidation({
		schema: joinSchema,
		onSubmit: addToCartAndRedirect,
	});

	if (!id) {
		return <Navigate to="/" replace />;
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const numValue = Number(value);
		setFormData((prev) => ({ ...prev, [name]: numValue }));
		setServerError(""); // Limpa erro do servidor quando o usuário digita
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	const onAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		addToCartOnly(formData);
	};

	return (
		<>
			<div className="d-flex justify-content-end">
				<Link className="btn-close btn-close-white" aria-label="Close" to="/" />
			</div>
			<div className="row">
				<div className="container col-md-6" style={{ width: "50%" }}>
					<img
						src={giveaway.imageUrl}
						className="rounded"
						style={{ objectFit: "cover", width: "100%" }}
						alt={giveaway.title}
					/>
				</div>

				<div className="col-md-6">
					<h2>{giveaway.title}</h2>
					<p>{giveaway.description}</p>

					{hasWinner && (
						<div className={`alert ${isCurrentUserWinner ? "alert-warning" : "alert-success"} mb-4`}>
							<h4 className="alert-heading">
								<i className="bi bi-trophy-fill me-2"></i>
								{isCurrentUserWinner ? "Parabéns! Você Ganhou!" : "Sorteio Finalizado!"}
							</h4>
							{isCurrentUserWinner && (
								<p className="mb-2">
									<i className="bi bi-star-fill me-1"></i>
									Você foi o(a) sortudo(a) desta vez! Entre em contato conosco para retirar seu
									prêmio.
								</p>
							)}
							<hr />
							<div className="row">
								<div className="col-md-8">
									<p className="mb-1">
										<strong>Vencedor:</strong> {giveaway.winner?.name}
									</p>
									<p className="mb-1">
										<strong>Email:</strong> {giveaway.winner?.email}
									</p>
								</div>
								<div className="col-md-4 text-end">
									{giveaway.luckyNumber && (
										<div
											className={`badge ${
												isCurrentUserWinner ? "bg-warning text-dark" : "bg-success"
											} fs-6 p-3`}
										>
											<div>Número da Sorte</div>
											<div className="fs-4">{giveaway.luckyNumber}</div>
										</div>
									)}
								</div>
							</div>
						</div>
					)}

					<p>
						<strong>Preço por entrada:</strong> R$ {giveaway.entryPrice.toFixed(2)}
					</p>
					<p>
						<strong>Entradas já vendidas:</strong> {soldEntries} / {totalEntries}
					</p>

					<form onSubmit={onSubmit}>
						<label htmlFor="entryCount" className="form-label">
							Quantidade de entradas
						</label>
						<input
							type="number"
							className={`form-control mb-3 bg-dark text-light border-secondary ${
								errors.entryCount ? "is-invalid" : ""
							}`}
							id="entryCount"
							name="entryCount"
							min="1"
							max={availableEntries}
							value={formData.entryCount}
							onChange={handleInputChange}
							disabled={hasWinner}
							required
						/>
						{errors.entryCount && <div className="invalid-feedback d-block mb-3">{errors.entryCount}</div>}

						{serverError && <div className="alert alert-danger py-2 mb-3">{serverError}</div>}

						<div className="d-grid gap-2 d-md-flex justify-content-md-start">
							<button
								type="button"
								className="btn btn-outline-primary"
								onClick={onAddToCart}
								disabled={availableEntries === 0 || hasWinner}
							>
								<i className="bi bi-cart-plus me-2"></i>
								Adicionar ao Carrinho
							</button>

							<button
								type="submit"
								className="btn btn-primary"
								disabled={availableEntries === 0 || hasWinner}
							>
								<i className="bi bi-lightning-charge me-2"></i>
								Participar Agora
							</button>
						</div>

						{!userId && !hasWinner && (
							<div className="text-info mt-2">
								<small>
									<i className="bi bi-info-circle me-1"></i>
									Faça login para finalizar sua compra no carrinho.
								</small>
							</div>
						)}

						{hasWinner && (
							<div className="text-success mt-2">
								<small>
									<i className="bi bi-check-circle me-1"></i>
									Este sorteio já foi finalizado e possui um vencedor.
								</small>
							</div>
						)}

						{availableEntries === 0 && !hasWinner && (
							<div className="text-warning mt-2">
								<small>Todas as entradas foram vendidas.</small>
							</div>
						)}

						{userId && availableEntries > 0 && !hasWinner && (
							<div className="text-info mt-2">
								<small>Total: R$ {(formData.entryCount * giveaway.entryPrice).toFixed(2)}</small>
							</div>
						)}
					</form>

					<div className="mt-4">
						<h5>Progresso:</h5>
						<div className="progress bg-secondary">
							<div
								className={`progress-bar ${hasWinner ? "bg-success" : "bg-primary"}`}
								style={{ width: `${hasWinner ? 100 : soldPercentage}%` }}
							>
								{hasWinner ? "100% - Finalizado" : `${soldPercentage}%`}
							</div>
						</div>
						{hasWinner && (
							<small className="text-success mt-1 d-block">
								<i className="bi bi-check-circle me-1"></i>
								Sorteio concluído com sucesso!
							</small>
						)}
					</div>

					<div className="mt-4">
						<h5>Criado em:</h5>
						<p>{new Date(giveaway.createdAt).toLocaleDateString("pt-BR")}</p>
					</div>

					{hasWinner && (
						<div className="mt-4">
							<Link to="/" className="btn btn-outline-primary">
								<i className="bi bi-arrow-left me-2"></i>
								Ver Outros Sorteios
							</Link>
						</div>
					)}
				</div>
			</div>

			<div className="toast-container position-fixed bottom-0 end-0 p-3">
				{/* Toast para adicionar ao carrinho apenas */}
				<div
					id="addToCartToast"
					className="toast border-secondary"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<div className="toast-header bg-dark text-light border-secondary">
						<strong className="me-auto">
							<i className="bi bi-cart-check me-2"></i>
							Adicionado ao Carrinho!
						</strong>
						<button
							type="button"
							className="btn-close btn-close-white"
							data-bs-dismiss="toast"
							aria-label="Close"
						></button>
					</div>
					<div className="toast-body bg-dark text-light border-secondary rounded-bottom">
						<p className="mb-0">Item adicionado ao carrinho com sucesso!</p>
					</div>
				</div>

				{/* Toast para participar agora */}
				<div
					id="participateToast"
					className="toast border-secondary"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<div className="toast-header bg-dark text-light border-secondary">
						<strong className="me-auto">
							<i className="bi bi-lightning-charge me-2"></i>
							Participando do Sorteio!
						</strong>
						<button
							type="button"
							className="btn-close btn-close-white"
							data-bs-dismiss="toast"
							aria-label="Close"
						></button>
					</div>
					<div className="toast-body bg-dark text-light border-secondary rounded-bottom">
						<p className="mb-1">Item adicionado ao carrinho!</p>
						<p className="mb-0">Redirecionando para finalizar sua compra...</p>
					</div>
				</div>
			</div>
		</>
	);
}
