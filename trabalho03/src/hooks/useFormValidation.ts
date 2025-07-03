import { useState } from "react";
import { z } from "zod";

interface UseFormValidationOptions<T> {
	schema: z.ZodSchema<T>;
	onSubmit: (data: T) => void | Promise<void>;
}

interface FormErrors {
	[key: string]: string | undefined;
}

export function useFormValidation<T extends Record<string, any>>({ schema, onSubmit }: UseFormValidationOptions<T>) {
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validate = (data: Partial<T>): { isValid: boolean; errors: FormErrors } => {
		try {
			schema.parse(data);
			return { isValid: true, errors: {} };
		} catch (error) {
			if (error instanceof z.ZodError) {
				const formattedErrors: FormErrors = {};
				error.errors.forEach((err) => {
					const path = err.path.join(".");
					formattedErrors[path] = err.message;
				});
				return { isValid: false, errors: formattedErrors };
			}
			return { isValid: false, errors: { general: "Erro de validação desconhecido" } };
		}
	};

	const validateField = (name: string, allData: Partial<T>) => {
		// Valida todos os dados para obter erros específicos do campo
		const validation = validate(allData);

		if (validation.errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: validation.errors[name],
			}));
		} else {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleSubmit = async (data: Partial<T>) => {
		setIsSubmitting(true);

		const validation = validate(data);
		setErrors(validation.errors);

		if (validation.isValid) {
			try {
				await onSubmit(data as T);
			} catch (error) {
				// Erro será tratado no componente
				console.error("Erro no submit:", error);
			}
		}

		setIsSubmitting(false);
	};

	const clearErrors = () => {
		setErrors({});
	};

	const clearFieldError = (fieldName: string) => {
		setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[fieldName];
			return newErrors;
		});
	};

	return {
		errors,
		isSubmitting,
		validate,
		validateField,
		handleSubmit,
		clearErrors,
		clearFieldError,
	};
}
