import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import styles from '../styles/components/MainContainer.module.css'

export function Login() {
	const {
		name,
		state,
		listOfStates,
		username,
		password,
		isSigningUp,
		isLoggedIn,
		handleNameChange,
		handleStateChange,
		handleUsernameChange,
		handlePasswordChange,
		handleSubmitLogin
	} = useContext(SessionContext)

	return (
		<div className={styles.mainContainer}>
			{ isLoggedIn ? null : (
				isSigningUp ? (
					<form onSubmit={handleSubmitLogin}>
						<h1>Comece agora</h1>
						<div className={styles.inputContainer}>
							<label htmlFor="name">
								Nome
							</label>
							<input
								value={name}
								onChange={handleNameChange}
								type="text"
								placeholder="Seu nome"
								name="name"
								required />

							<label htmlFor="state">
								Estado
							</label>
							<select
								value={state}
								onChange={handleStateChange}
								name="state"
								required>
								<option disabled selected value="" >
									Selecione seu estado
								</option>
								{listOfStates.map(
									(currentState: { id, name }) => {
										return (
											<option value={currentState.id}>
												{currentState.name}
											</option>)
									})}
							</select>

							<label htmlFor="username">
								Email
							</label>
							<input
								value={username}
								onChange={handleUsernameChange}
								type="email"
								placeholder="Seu email"
								name="username"
								required />

							<label htmlFor="password">
								Senha
							</label>
							<input
								value={password}
								onChange={handlePasswordChange}
								type="password"
								placeholder="Sua senha"
								name="password"
								required />
						</div>
						<div className={styles.submitContainer}>
							<button type="submit">
								Cadastrar
							</button>
						</div>
					</form>
				) : (
					<form onSubmit={handleSubmitLogin}>
						<h1>Acesse sua conta</h1>
						<div className={styles.inputContainer}>
							<label htmlFor="username">
								Email
							</label>
							<input
								value={username}
								onChange={handleUsernameChange}
								type="text"
								placeholder="Seu email"
								name="username"
								required />

							<label htmlFor="password">
								Senha
							</label>
							<input
								value={password}
								onChange={handlePasswordChange}
								type="password"
								placeholder="Sua senha"
								name="password"
								required />
						</div>
						<div className={styles.submitContainer}>
							<button type="submit">
								Entrar
							</button>
						</div>
					</form>
				))}
		</div>
	)
}