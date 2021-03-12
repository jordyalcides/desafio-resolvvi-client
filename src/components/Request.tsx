import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import styles from '../styles/components/MainContainer.module.css'
import { MatchModal } from './MatchModal'

export function Request() {
	const {
		isLoggedIn,
		isMakingRequest,
		requestTitle,
		requestDescription,
		requestValue,
		isMatchModalOpen,
		handleRequestTitleChange,
		handleRequestDescriptionChange,
		handleRequestValueChange,
		handleSubmitRequest
	} = useContext(SessionContext)

	return (
		<div className={styles.mainContainer}>
			{ isLoggedIn ? (
				isMakingRequest ? (
					<>
						{isMatchModalOpen && <MatchModal />}

						<form onSubmit={handleSubmitRequest}>
							<h1>Faça seu pedido de indenização</h1>
							<strong>Descreva seu caso e o valor que deseja receber</strong>
							<div className={styles.inputContainer}>
								<label htmlFor="requestTitle">
									Título
								</label>
								<input
									value={requestTitle}
									onChange={handleRequestTitleChange}
									type="text"
									placeholder="Dê um título ao seu pedido de indenização"
									name="requestTitle"
									required />

								<label htmlFor="requestDescription">
									Caso
								</label>
								<textarea
									value={requestDescription}
									onChange={handleRequestDescriptionChange}
									placeholder="Descreva seu caso com todos os detalhes"
									name="requestDescription"
									rows={4}
									required>
								</textarea>

								<label htmlFor="requestValue">
									Valor desejado
								</label>
								<input
									value={requestValue}
									onChange={handleRequestValueChange}
									type="number"
									placeholder="Quanto deseja receber por esse caso?"
									name="requestValue"
									required
								/>
							</div>
							<div className={styles.submitContainer}>
								<button type="submit">
									Entrar
								</button>
							</div>
						</form>
					</>
				) : null
			) : null}
		</div>
	)
}