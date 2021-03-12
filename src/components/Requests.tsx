import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import styles from '../styles/components/MainContainer.module.css'
import customStyles from '../styles/components/Requests.module.css'

export function Requests() {
	const {
		isLoggedIn,
		request,
		isMakingRequest,
	} = useContext(SessionContext)

	return (
		<div className={styles.mainContainer}>
			{ isLoggedIn ? (
				isMakingRequest ? null : (
					<div>
						<h1>Histórico de pedidos</h1>
						<strong>
							Todos as suas requisições já feitas ficam aqui,
							para você poder checar os status de cada uma.
						</strong>
						{request.map(
							(currentRequest: { title, description, value }) => {
								return (
									<div className={customStyles.requestsContainer} >
										<h1>{currentRequest.title}</h1>
										<strong>{currentRequest.description}</strong>
										<span>R$ {currentRequest.value}</span>
									</div>
								)
							})}

					</div>
				)) : null}
		</div>
	)
}