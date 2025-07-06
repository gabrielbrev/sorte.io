import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartFromStorage, removeItemFromCart, updateItemQuantity, clearCart } from "../utils/cart";
import { useJoinGiveaway, type JoinGiveawayRequest } from "../hooks/giveaway/useJoinGiveaway";
import { isLogged } from "../lib/isLogged";
import type { Cart } from "../interfaces/CartItem";
import Toast from "bootstrap/js/dist/toast";

export default function ShoppingCart() {
	const [cart, setCart] = useState<Cart>({ items: [], totalAmount: 0 });
	const [isProcessing, setIsProcessing] = useState(false);
	const joinGiveawayMutation = useJoinGiveaway();
	const loggedUser = isLogged();
	const { id: userId } = loggedUser || {};

	useEffect(() => {
		setCart(getCartFromStorage());
	}, []);

	const handleRemoveItem = (giveawayId: string) => {
		const updatedCart = removeItemFromCart(giveawayId);
		setCart(updatedCart);
	};

	const handleUpdateQuantity = (giveawayId: string, newQuantity: number) => {
		const updatedCart = updateItemQuantity(giveawayId, newQuantity);
		setCart(updatedCart);
	};

	const handleCheckout = async () => {
		setIsProcessing(true);

		try {
			const joinRequest: JoinGiveawayRequest = {
				userId: userId!,
				items: cart.items.map((item) => ({
					giveawayId: item.giveawayId,
					numEntries: item.entryCount,
				})),
			};

			await joinGiveawayMutation.mutateAsync(joinRequest);

			clearCart();
			setCart({ items: [], totalAmount: 0 });

			const toastElement = document.getElementById("checkoutToast");
			if (toastElement) {
				const toast = Toast.getOrCreateInstance(toastElement);
				toast.show();
			}
		} catch (error) {
			console.error("Erro ao finalizar compra:", error);
		} finally {
			setIsProcessing(false);
		}
	};

	if (cart.items.length === 0) {
		return (
			<div className="container mt-4">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="text-center">
							<i className="bi bi-cart-x display-1 text-muted mb-3"></i>
							<h2>Seu carrinho está vazio</h2>
							<p className="text-muted mb-4">Adicione alguns sorteios ao seu carrinho para começar.</p>
							<Link to="/" className="btn btn-primary">
								<i className="bi bi-arrow-left me-2"></i>
								Ver Sorteios
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-4">
			<div className="row">
				<div className="col-md-8">
					<h2 className="mb-4">
						<i className="bi bi-cart3 me-2"></i>
						Carrinho de Compras
					</h2>

					{cart.items.map((item) => (
						<div key={item.giveawayId} className="card bg-dark border-secondary mb-3">
							<div className="card-body">
								<div className="row align-items-center">
									<div className="col-md-2">
										<img
											src={item.imageUrl}
											alt={item.title}
											className="img-fluid rounded"
											style={{ maxHeight: "80px", objectFit: "cover", width: "100%" }}
										/>
									</div>
									<div className="col-md-4">
										<h5 className="card-title mb-2">{item.title}</h5>
										<p className="text-muted mb-1 small">
											Preço por entrada: R$ {item.entryPrice.toFixed(2)}
										</p>
									</div>
									<div className="col-md-3">
										<label className="form-label small">Quantidade:</label>
										<div className="input-group input-group-sm">
											<button
												className="btn btn-outline-secondary"
												type="button"
												onClick={() =>
													handleUpdateQuantity(item.giveawayId, item.entryCount - 1)
												}
												disabled={item.entryCount <= 1}
											>
												<i className="bi bi-dash"></i>
											</button>
											<input
												type="number"
												className="form-control text-center bg-dark text-light border-secondary"
												value={item.entryCount}
												min="1"
												onChange={(e) => {
													const newValue = parseInt(e.target.value) || 1;
													if (newValue >= 1) {
														handleUpdateQuantity(item.giveawayId, newValue);
													}
												}}
												style={{ maxWidth: "60px" }}
											/>
											<button
												className="btn btn-outline-secondary"
												type="button"
												onClick={() =>
													handleUpdateQuantity(item.giveawayId, item.entryCount + 1)
												}
											>
												<i className="bi bi-plus"></i>
											</button>
										</div>
									</div>
									<div className="col-md-2 text-end">
										<div className="mb-2">
											<strong>R$ {item.totalPrice.toFixed(2)}</strong>
										</div>
									</div>
									<div className="col-md-1 text-end">
										<button
											className="btn btn-sm btn-outline-danger"
											onClick={() => handleRemoveItem(item.giveawayId)}
											title="Remover item"
										>
											<i className="bi bi-x-lg"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="col-md-4">
					<div className="card bg-dark border-secondary sticky-top">
						<div className="card-header">
							<h5 className="mb-0">Resumo do Pedido</h5>
						</div>
						<div className="card-body">
							<div className="d-flex justify-content-between mb-2">
								<span>Items no carrinho:</span>
								<span>{cart.items.reduce((total, item) => total + item.entryCount, 0)}</span>
							</div>
							<div className="d-flex justify-content-between mb-3">
								<span>Sorteios:</span>
								<span>{cart.items.length}</span>
							</div>
							<hr />
							<div className="d-flex justify-content-between mb-3">
								<strong>Total:</strong>
								<strong>R$ {cart.totalAmount.toFixed(2)}</strong>
							</div>

							<button className="btn btn-success w-100" onClick={handleCheckout} disabled={isProcessing}>
								{isProcessing ? (
									<>
										<span
											className="spinner-border spinner-border-sm me-2"
											role="status"
											aria-hidden="true"
										></span>
										Processando...
									</>
								) : (
									<>
										<i className="bi bi-credit-card me-2"></i>
										Finalizar Compra
									</>
								)}
							</button>

							<Link to="/" className="btn btn-outline-primary w-100 mt-2">
								<i className="bi bi-arrow-left me-2"></i>
								Continuar Comprando
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Toast de sucesso */}
			<div className="toast-container position-fixed bottom-0 end-0 p-3">
				<div
					id="checkoutToast"
					className="toast border-secondary"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<div className="toast-header bg-success text-white border-secondary">
						<strong className="me-auto">
							<i className="bi bi-check-circle me-2"></i>
							Compra Realizada!
						</strong>
						<button
							type="button"
							className="btn-close btn-close-white"
							data-bs-dismiss="toast"
							aria-label="Close"
						></button>
					</div>
					<div className="toast-body bg-dark text-light border-secondary rounded-bottom">
						Parabéns! Você está participando dos sorteios. Boa sorte!
					</div>
				</div>
			</div>
		</div>
	);
}
