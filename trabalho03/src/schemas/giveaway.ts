import { z } from "zod";

export const createGiveawaySchema = z.object({
	title: z
		.string()
		.min(1, "Título é obrigatório")
		.min(5, "Título deve ter pelo menos 5 caracteres")
		.max(100, "Título não pode ter mais de 100 caracteres"),
	description: z
		.string()
		.min(1, "Descrição é obrigatória")
		.min(10, "Descrição deve ter pelo menos 10 caracteres")
		.max(500, "Descrição não pode ter mais de 500 caracteres"),
	entryPrice: z
		.number({
			required_error: "Preço da entrada é obrigatório",
			invalid_type_error: "Preço deve ser um número",
		})
		.positive("Preço da entrada deve ser maior que zero")
		.min(0.01, "Preço mínimo é R$ 0,01")
		.max(1000, "Preço máximo é R$ 1.000,00")
		.multipleOf(0.01, "Preço deve ter no máximo 2 casas decimais"),
	numEntries: z
		.number({
			required_error: "Número de entradas é obrigatório",
			invalid_type_error: "Número de entradas deve ser um número inteiro",
		})
		.int("Número de entradas deve ser um número inteiro")
		.positive("Número de entradas deve ser maior que zero")
		.min(1, "Mínimo de 1 entrada"),
	imageUrl: z
		.string()
		.min(1, "URL da imagem é obrigatória")
		.url("URL da imagem deve ser válida")
		.refine((url) => {
			// Verifica se a URL parece ser de uma imagem
			const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
			const lowerUrl = url.toLowerCase();
			return (
				imageExtensions.some((ext) => lowerUrl.includes(ext)) ||
				lowerUrl.includes("image") ||
				lowerUrl.includes("img")
			);
		}, "URL deve ser de uma imagem válida"),
});

export const updateGiveawaySchema = createGiveawaySchema.extend({
	id: z.string().min(1, "ID do sorteio é obrigatório"),
});

export const joinGiveawaySchema = z.object({
	entryCount: z
		.number({
			required_error: "Quantidade de entradas é obrigatória",
			invalid_type_error: "Quantidade deve ser um número inteiro",
		})
		.int("Quantidade deve ser um número inteiro")
		.positive("Quantidade deve ser maior que zero")
		.min(1, "Mínimo de 1 entrada"),
});

export const createUpdateGiveawaySchemaWithSoldEntries = (soldEntries: number) => {
	return updateGiveawaySchema.refine((data) => data.numEntries >= soldEntries, {
		message: `Não é possível reduzir o número de entradas abaixo de ${soldEntries} (já vendidas)`,
		path: ["numEntries"],
	});
};

export const createJoinGiveawaySchemaWithAvailableEntries = (availableEntries: number) => {
	return joinGiveawaySchema.refine((data) => data.entryCount <= availableEntries, {
		message: `Máximo de ${availableEntries} entradas disponíveis`,
		path: ["entryCount"],
	});
};

export type CreateGiveawayFormData = z.infer<typeof createGiveawaySchema>;
export type UpdateGiveawayFormData = z.infer<typeof updateGiveawaySchema>;
export type JoinGiveawayFormData = z.infer<typeof joinGiveawaySchema>;
