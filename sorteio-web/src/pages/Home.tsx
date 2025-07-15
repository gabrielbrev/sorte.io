import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useFindActiveGiveaways } from "../hooks/giveaway/useFindActiveGiveaways";
import { GiveawayCard } from "../components/GiveawayCard";

export default function Home() {
	const [showScrollTop, setShowScrollTop] = useState(false);
	const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFindActiveGiveaways(3);

	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: "100px",
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleLoadMore = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Carregando...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="alert alert-danger" role="alert">
				<h4 className="alert-heading">Erro ao carregar sorteios</h4>
				<p>{error.message}</p>
				<hr />
				<button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
					Tentar novamente
				</button>
			</div>
		);
	}

	const allGiveaways = data?.pages.flatMap((page) => page.items) || [];

	return (
		<>
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h1>Sorteios Ativos</h1>
				{data?.pages[0] && (
					<small className="text-muted">
						{allGiveaways.length} de {data.pages[0].totalItems} sorteios
					</small>
				)}
			</div>

			<div className="d-flex flex-column align-items-center">
				{allGiveaways.map((g) => (
					<GiveawayCard
						key={g.id}
						id={g.id}
						imageUrl={g.imageUrl}
						title={g.title}
						description={g.description}
						entryPrice={g.entryPrice}
						createdAt={g.createdAt}
					/>
				))}
			</div>

			{/* Loading indicator when fetching next page */}
			{isFetchingNextPage && (
				<div className="d-flex justify-content-center align-items-center mt-4">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Carregando mais sorteios...</span>
					</div>
				</div>
			)}

			{/* Load More button as fallback */}
			{hasNextPage && !isFetchingNextPage && (
				<div className="text-center mt-4">
					<button className="btn btn-outline-primary" onClick={handleLoadMore}>
						Carregar mais sorteios
					</button>
				</div>
			)}

			{/* Invisible element to trigger infinite scroll */}
			{hasNextPage && <div ref={ref} style={{ height: "20px", visibility: "hidden" }} />}

			{/* Show message when no more pages */}
			{!hasNextPage && allGiveaways.length > 0 && (
				<div className="text-center mt-4 mb-4">
					<div className="alert alert-info">
						<i className="bi bi-check-circle-fill me-2"></i>
						Todos os sorteios foram carregados!
					</div>
				</div>
			)}

			{/* Show message when no giveaways found */}
			{!isLoading && allGiveaways.length === 0 && (
				<div className="text-center mt-5">
					<div className="alert alert-warning">
						<i className="bi bi-exclamation-triangle-fill me-2"></i>
						Nenhum sorteio ativo encontrado no momento.
					</div>
				</div>
			)}

			{/* Scroll to top button */}
			{showScrollTop && (
				<button
					className="btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle"
					style={{ width: "50px", height: "50px", zIndex: 1000 }}
					onClick={scrollToTop}
					title="Voltar ao topo"
				>
					<i className="bi bi-arrow-up"></i>
				</button>
			)}
		</>
	);
}
