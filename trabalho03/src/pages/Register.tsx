import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/user/useRegister";
import { registerSchema, type RegisterFormData } from "../schemas/auth";
import { useFormValidation } from "../hooks/useFormValidation";

export default function Register() {
	const [formData, setFormData] = useState<RegisterFormData>({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
	});
	const [serverError, setServerError] = useState("");
	const navigate = useNavigate();
	const registerMutation = useRegister();

	const { errors, handleSubmit } = useFormValidation({
		schema: registerSchema,
		onSubmit: async (data: RegisterFormData) => {
			setServerError("");

			try {
				await registerMutation.mutateAsync(data);
				navigate("/login", { replace: true });
			} catch (err: any) {
				setServerError(err?.message || "Erro ao cadastrar. Tente novamente.");
			}
		},
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setServerError("");
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, ""); // Remove não-dígitos

		// Formata para (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
		if (value.length <= 11) {
			value = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
			value = value.replace(/^(\d{2})(\d{1,5})$/, "($1) $2");
			value = value.replace(/^(\d{1,2})$/, "($1");
		}

		setFormData((prev) => ({ ...prev, phoneNumber: value }));
		setServerError("");
	};

	return (
		<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
			<div className="card bg-dark text-light border-secondary" style={{ minWidth: 350 }}>
				<div className="card-body">
					<h2 className="card-title mb-4 text-center">Cadastro</h2>
					<form onSubmit={onSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Nome completo
							</label>
							<input
								type="text"
								className={`form-control bg-dark text-light border-secondary ${
									errors.name ? "is-invalid" : ""
								}`}
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								required
								autoFocus
							/>
							{errors.name && <div className="invalid-feedback">{errors.name}</div>}
						</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								type="email"
								className={`form-control bg-dark text-light border-secondary ${
									errors.email ? "is-invalid" : ""
								}`}
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
							{errors.email && <div className="invalid-feedback">{errors.email}</div>}
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Senha
							</label>
							<input
								type="password"
								className={`form-control bg-dark text-light border-secondary ${
									errors.password ? "is-invalid" : ""
								}`}
								id="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								required
							/>
							{errors.password && <div className="invalid-feedback">{errors.password}</div>}
						</div>
						<div className="mb-3">
							<label htmlFor="phoneNumber" className="form-label">
								Telefone
							</label>
							<input
								type="tel"
								className={`form-control bg-dark text-light border-secondary ${
									errors.phoneNumber ? "is-invalid" : ""
								}`}
								id="phoneNumber"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handlePhoneChange}
								placeholder="(11) 99999-9999"
								maxLength={15}
								required
							/>
							{errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
						</div>
						{serverError && <div className="alert alert-danger py-2">{serverError}</div>}
						<button
							type="submit"
							className="btn btn-primary w-100 mt-2"
							disabled={registerMutation.isPending}
						>
							{registerMutation.isPending ? (
								<>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									></span>
									Cadastrando...
								</>
							) : (
								"Cadastrar"
							)}
						</button>
						<div className="text-center mt-3">
							<span>Já tem uma conta? </span>
							<Link to="/login" className="btn btn-link text-primary p-0 align-baseline">
								Entrar
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
