import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useLogin } from "../hooks/user/useLogin";
import { loginSchema, type LoginFormData } from "../schemas/auth";
import { useFormValidation } from "../hooks/useFormValidation";

export default function Login() {
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const [serverError, setServerError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const loginMutation = useLogin();

	const { errors, handleSubmit } = useFormValidation({
		schema: loginSchema,
		onSubmit: async (data: LoginFormData) => {
			setServerError("");

			try {
				const result = await loginMutation.mutateAsync(data);

				if (!result) {
					setServerError("Houve um erro interno");
					return;
				}

				const dest = (location.state as any)?.destination || "/";
				navigate(dest, { replace: true });
			} catch (err: any) {
				setServerError("Email ou senha inválidos.");
			}
		},
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setServerError(""); // Limpa erro do servidor quando o usuário digita
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	return (
		<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
			<div className="card bg-dark text-light border-secondary" style={{ minWidth: 350 }}>
				<div className="card-body">
					<h2 className="card-title mb-4 text-center">Login</h2>
					<form onSubmit={onSubmit}>
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
								autoFocus
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
						{serverError && <div className="alert alert-danger py-2">{serverError}</div>}
						<button type="submit" className="btn btn-primary w-100 mt-2" disabled={loginMutation.isPending}>
							{loginMutation.isPending ? (
								<>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									></span>
									Entrando...
								</>
							) : (
								<>
									<i className="bi bi-box-arrow-in-right me-2"></i>
									Entrar
								</>
							)}
						</button>
						<div className="text-center mt-3">
							<span>Não tem uma conta? </span>
							<Link to="/register" className="btn btn-link text-primary p-0 align-baseline">
								Cadastre-se
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
