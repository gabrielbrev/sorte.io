import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

interface GiveawayCardProps {
	id: string;
	imageUrl: string;
	title: string;
	description: string;
	entryPrice: number;
	createdAt: Date;
}

export function GiveawayCard({ id, imageUrl, title, description, entryPrice, createdAt }: GiveawayCardProps) {
	const { isFavorite, toggleFavorite, createFavoriteFromGiveaway, isLoggedIn } = useFavorites();
	const isItemFavorite = isFavorite(id);

	const handleToggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!isLoggedIn) return;

		const favoriteItem = createFavoriteFromGiveaway({
			id,
			title,
			imageUrl,
			description,
			entryPrice,
			createdAt,
		});
		toggleFavorite(favoriteItem);
	};

	return (
		<div key={id} className="card mb-3 bg-dark text-light border-secondary" style={{ width: "600px" }}>
			<img
				src={imageUrl}
				className="card-img-top img-fluid object-fit-cover"
				style={{ height: "300px" }}
				alt={title}
			/>
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{description}</p>
				<div className="d-flex justify-content-center">
					<Link to={`/giveaway?id=${id}`} className="btn btn-primary">
						Participar Agora
					</Link>
				</div>
				<div className="d-flex justify-content-between align-items-end mt-3">
					<p className="card-text mb-0">
						<small className="text-secondary">
							Criado em {new Date(createdAt).toLocaleDateString("pt-BR")}
						</small>
					</p>
					{isLoggedIn && (
						<a
							href="#"
							onClick={handleToggleFavorite}
							className="text-danger"
							style={{ textDecoration: "none", fontSize: "1.5rem" }}
						>
							<i className={isItemFavorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
