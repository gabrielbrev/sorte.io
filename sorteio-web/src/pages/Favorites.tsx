import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useCart } from "../hooks/useCart";

export default function Favorites() {
	const { favorites, removeFavorite, isEmpty } = useFavorites();
	const { addGiveawayToCart, updateItemQuantity, getItemQuantity } = useCart();

	const handleUpdateQuantity = (giveawayId: string, newQuantity: number) => {
		updateItemQuantity(giveawayId, newQuantity);
	};

	const handleAddToCart = (giveawayId: string, title: string, imageUrl: string, entryPrice: number) => {
		addGiveawayToCart(giveawayId, title, imageUrl, entryPrice, 1);
	};

	const handleRemoveFavorite = (giveawayId: string) => {
		removeFavorite(giveawayId);
	};

	if (isEmpty) {
		return (
			<div className="container mt-4">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="text-center">
							<i className="bi bi-heart display-1 text-muted mb-3"></i>
							<h2>Sua lista de favoritos está vazia</h2>
							<p className="text-muted mb-4">
								Adicione alguns sorteios aos seus favoritos para vê-los aqui.
							</p>
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
				<div className="col-12">
					<h2 className="mb-4">Meus Favoritos</h2>

					{favorites.map((favorite) => {
						const cartQuantity = getItemQuantity(favorite.giveawayId);

						return (
							<div key={favorite.giveawayId} className="card bg-dark border-secondary mb-3">
								<div className="card-body">
									<div className="row align-items-center">
										<div className="col-md-2">
											<img
												src={favorite.imageUrl}
												alt={favorite.title}
												className="img-fluid rounded"
												style={{
													maxHeight: "120px",
													objectFit: "cover",
													width: "100%",
												}}
											/>
										</div>
										<div className="col-md-4">
											<h5 className="card-title mb-2">{favorite.title}</h5>
											<p className="text-muted mb-1 small">{favorite.description}</p>
											<p className="text-muted mb-1 small">
												Preço por entrada: R$ {favorite.entryPrice.toFixed(2)}
											</p>
											<p className="text-muted mb-0 small">
												Criado em {new Date(favorite.createdAt).toLocaleDateString("pt-BR")}
											</p>
										</div>
										<div className="col-md-3">
											<label className="form-label small">Quantidade no carrinho:</label>
											{cartQuantity > 0 ? (
												<div className="input-group input-group-sm">
													<button
														className="btn btn-outline-secondary"
														type="button"
														onClick={() =>
															handleUpdateQuantity(favorite.giveawayId, cartQuantity - 1)
														}
														disabled={cartQuantity <= 0}
													>
														<i className="bi bi-dash"></i>
													</button>
													<input
														type="number"
														className="form-control text-center bg-dark text-light border-secondary"
														value={cartQuantity}
														min="0"
														onChange={(e) => {
															const newValue = parseInt(e.target.value) || 0;
															if (newValue >= 0) {
																handleUpdateQuantity(favorite.giveawayId, newValue);
															}
														}}
														style={{ maxWidth: "60px" }}
													/>
													<button
														className="btn btn-outline-secondary"
														type="button"
														onClick={() =>
															handleUpdateQuantity(favorite.giveawayId, cartQuantity + 1)
														}
													>
														<i className="bi bi-plus"></i>
													</button>
												</div>
											) : (
												<div>
													<p className="text-muted small mb-2">Não está no carrinho</p>
													<button
														className="btn btn-outline-primary btn-sm"
														onClick={() =>
															handleAddToCart(
																favorite.giveawayId,
																favorite.title,
																favorite.imageUrl,
																favorite.entryPrice,
															)
														}
													>
														<i className="bi bi-cart-plus me-1"></i>
														Adicionar ao Carrinho
													</button>
												</div>
											)}
										</div>
										<div className="col-md-2 text-end">
											{cartQuantity > 0 && (
												<div className="mb-2">
													<strong>
														R$ {(cartQuantity * favorite.entryPrice).toFixed(2)}
													</strong>
												</div>
											)}
											<Link
												to={`/giveaway?id=${favorite.giveawayId}`}
												className="btn btn-sm btn-outline-primary mb-2 w-100"
											>
												<i className="bi bi-eye me-1"></i>
												Ver Detalhes
											</Link>
										</div>
										<div className="col-md-1 text-end">
											<button
												className="btn btn-sm btn-outline-danger"
												onClick={() => handleRemoveFavorite(favorite.giveawayId)}
												title="Remover dos favoritos"
											>
												<i className="bi bi-heart-fill"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}

					<div className="text-center mt-4">
						<Link to="/" className="btn btn-outline-primary">
							<i className="bi bi-arrow-left me-2"></i>
							Continuar Navegando
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
