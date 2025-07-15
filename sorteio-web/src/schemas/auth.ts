import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email é obrigatório").email("Email deve ter um formato válido"),
	password: z.string().min(1, "Senha é obrigatória").min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, "Nome é obrigatório")
			.min(2, "Nome deve ter pelo menos 2 caracteres")
			.max(100, "Nome não pode ter mais de 100 caracteres")
			.regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
		email: z.string().min(1, "Email é obrigatório").email("Email deve ter um formato válido"),
		password: z
			.string()
			.min(1, "Senha é obrigatória")
			.min(6, "Senha deve ter pelo menos 6 caracteres")
			.max(50, "Senha não pode ter mais de 50 caracteres"),
		confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
