import Rand from "rand-seed";

export type Giveaway = {
	id: string;
	title: string;
	description: string;
	entryPrice: number;
	totalEntries: number;
	soldEntries: number;
	image: string;
	winnerId: string;
	ownerId: string;
};

const giveaways: Giveaway[] = [
	{
		id: "1",
		title: "Mitsubishi Eclipse 1995",
		description: "Um clássico dos anos 90 com design esportivo e motor turbo. Participe por apenas R$0,50.",
		entryPrice: 0.5,
		totalEntries: 8000,
		soldEntries: 2430,
		image: "https://www.webmotors.com.br/wp-content/uploads/2020/06/03164109/mitsubishi-eclipse-2.0-gst-16v-turbo-gasolina-2p-manual-wmimagem10525305116.jpg",
		winnerId: "",
		ownerId: "user_123",
	},
	{
		id: "2",
		title: "Patek Philippe Aquanaut ‘Luce’",
		description: "Um símbolo de luxo moderno e exclusividade. Concorra com apenas R$5,00.",
		entryPrice: 5.0,
		totalEntries: 5000,
		soldEntries: 1980,
		image: "https://swisswatches-magazine.com/wp-content/uploads/2023/11/patek-philippe-5261R-001-rosegold-titlepicture-new-1600x1067.jpg",
		winnerId: "",
		ownerId: "user_456",
	},
	{
		id: "3",
		title: "PlayStation 5 + 2 Controles",
		description: "O console mais desejado do momento com dois controles. Participe por R$2,00.",
		entryPrice: 2.0,
		totalEntries: 7000,
		soldEntries: 5240,
		image: "https://images.tcdn.com.br/img/img_prod/616573/console_playstation_5_slim_com_2_controles_1tb_ssd_novo_modelo_1168_1_7e49ef6a28354e0a427b5c6a92250572.jpg",
		winnerId: "user_159",
		ownerId: "user_789",
	},
	{
		id: "4",
		title: "iPhone 15 Pro Max 256GB",
		description: "O mais novo lançamento da Apple com câmera avançada. Participe por R$3,00.",
		entryPrice: 3.0,
		totalEntries: 6000,
		soldEntries: 4170,
		image: "https://img.olx.com.br/images/83/834444567144016.jpg",
		winnerId: "",
		ownerId: "user_321",
	},
	{
		id: "5",
		title: "Samsung Galaxy S24 Ultra",
		description: "Smartphone topo de linha com câmera de 200MP. Participe por R$3,00.",
		entryPrice: 3.0,
		totalEntries: 6500,
		soldEntries: 3900,
		image: "https://images.samsung.com/br/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-yellow-back-mo.jpg?imbypass=true",
		winnerId: "",
		ownerId: "user_654",
	},
	{
		id: "6",
		title: 'MacBook Pro 16" M3',
		description: "Potência e desempenho para profissionais. Participe por R$4,00.",
		entryPrice: 4.0,
		totalEntries: 7000,
		soldEntries: 2620,
		image: "https://www.notebookcheck.info/fileadmin/_processed_/7/e/csm_IMG_1248_625a79dd2e.jpg",
		winnerId: "",
		ownerId: "user_987",
	},
	{
		id: "7",
		title: "Xbox Series X",
		description: "O console mais poderoso da Microsoft. Participe por R$2,00.",
		entryPrice: 2.0,
		totalEntries: 7000,
		soldEntries: 4890,
		image: "https://cdn.awsli.com.br/2500x2500/1919/1919257/produto/130225667/01df7cc858.jpg",
		winnerId: "",
		ownerId: "user_852",
	},
	{
		id: "8",
		title: "Nintendo Switch OLED",
		description: "Diversão portátil com tela OLED vibrante. Participe por R$1,50.",
		entryPrice: 1.5,
		totalEntries: 5500,
		soldEntries: 4120,
		image: "https://images.tcdn.com.br/img/img_prod/872390/console_nintendo_switch_oled_64gb_edicao_mario_kart_8_deluxe_branco_1563_2_eb51aa2716573233f2e69a75f57cf472.jpg",
		winnerId: "",
		ownerId: "user_741",
	},
	{
		id: "9",
		title: "Apple Watch Series 9",
		description: "Tecnologia de ponta no seu pulso. Participe por R$2,00.",
		entryPrice: 2.0,
		totalEntries: 5000,
		soldEntries: 2870,
		image: "https://down-br.img.susercontent.com/file/cn-11134207-7ras8-m0id6rbgm24u22",
		winnerId: "",
		ownerId: "user_456",
	},
	{
		id: "10",
		title: "GoPro HERO12 Black",
		description: "Capture cada aventura com qualidade profissional. Participe por R$1,00.",
		entryPrice: 1.0,
		totalEntries: 4000,
		soldEntries: 1530,
		image: "https://i.ytimg.com/vi/UZ5G0tVwBkI/maxresdefault.jpg",
		winnerId: "",
		ownerId: "user_159",
	},
	{
		id: "11",
		title: "Drone DJI Mini 4 Pro",
		description: "Imagens aéreas incríveis com facilidade. Participe por R$2,50.",
		entryPrice: 2.5,
		totalEntries: 6000,
		soldEntries: 2710,
		image: "https://img.kalunga.com.br/fotosdeprodutos/234041z_4.jpg",
		winnerId: "user_492",
		ownerId: "user_753",
	},
	{
		id: "12",
		title: "Câmera Canon EOS R6",
		description: "Fotografia profissional em suas mãos. Participe por R$3,00.",
		entryPrice: 3.0,
		totalEntries: 5000,
		soldEntries: 2180,
		image: "https://cdn.awsli.com.br/600x450/187/187298/produto/264810870/canon-r6-mark-ii-review-eim7y3ktgr.jpg",
		winnerId: "",
		ownerId: "user_357",
	},
	{
		id: "13",
		title: 'Smart TV Samsung 65" 4K',
		description: "Experiência cinematográfica em casa. Participe por R$2,00.",
		entryPrice: 2.0,
		totalEntries: 6000,
		soldEntries: 3200,
		image: "https://a-static.mlcdn.com.br/1500x1500/smart-tv-65-4k-uhd-led-samsung-65du7700-wi-fi-alexa-3-hdmi/magazineluiza/238245200/8f826eac395bf3c05df5b9182ad17215.jpg",
		winnerId: "",
		ownerId: "user_258",
	},
	{
		id: "14",
		title: "Console Retro Arcade",
		description: "Reviva os clássicos dos anos 80 e 90. Participe por R$1,00.",
		entryPrice: 1.0,
		totalEntries: 4000,
		soldEntries: 2850,
		image: "https://i.zst.com.br/thumbs/12/5/35/2006313140.jpg",
		winnerId: "user_738",
		ownerId: "user_456",
	},
	{
		id: "15",
		title: "Fone de Ouvido Sony WH-1000XM5",
		description: "Cancelamento de ruído líder de mercado. Participe por R$1,50.",
		entryPrice: 1.5,
		totalEntries: 4500,
		soldEntries: 1980,
		image: "https://m.media-amazon.com/images/I/61ULAZmt9NL.jpg",
		winnerId: "",
		ownerId: "user_654",
	},
];

export function getGiveaway(id: string) {
	return JSON.parse(JSON.stringify(giveaways.find((g) => g.id === id))) as Giveaway;
}

export function getGiveaways(page: number, limit: number = 10) {
	const start = page * limit;
	const end = start + limit;

	const items = giveaways.slice(start, end);
	const numPages = Math.ceil(giveaways.length / limit);

	return { items, numPages };
}

export function getOwnedGiveaways(userId: string) {
	return giveaways.filter((g) => g.ownerId === userId);
}

export function getEnteredGiveaways(userId: string) {
	type EnteredGiveaway = Giveaway & { myEntries: number };

	const rand = new Rand(userId);
	const nextNum = (max: number) => Math.round(rand.next() * max);

	const numGiveaways = nextNum(giveaways.length);

	const randomized: EnteredGiveaway[] = [];
	for (let i = 0; i < numGiveaways; i += 1) {
		let g: Giveaway;

		do {
			g = giveaways[nextNum(giveaways.length)];
		} while (randomized.find((item) => item.id === g?.id));

		randomized.push({ ...g, myEntries: nextNum(Math.round(g.totalEntries * 0.1)) });
	}

	return randomized;
}

export function getFinishedGiveaways() {
	return giveaways
		.filter((g) => g.winnerId.length)
		.map((g) => {
			const rand = new Rand(g.id);
			const nextNum = (max: number) => Math.round(rand.next() * max);

			return { ...g, luckyNumber: nextNum(g.totalEntries) };
		});
}
