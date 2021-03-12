import { useContext } from "react"
import { SessionContext } from "../contexts/SessionContext"
import styles from '../styles/components/MatchModal.module.css'


export function MatchModal() {
	const { closeMatchModal, lawyerName } = useContext(SessionContext)

	return (
		<div className={styles.overlay}>
			<div className={styles.matchModalContainer}>
				<h1>Parabéns!</h1>
				<strong>Seu caso já foi encaminhado a um Advogado!</strong>
				<p>Seu advogado(a) se chama {lawyerName} </p>

				<button type="button" onClick={closeMatchModal} >
					<img src="/svg/close.svg" alt="Fechar modal" />
				</button>
			</div>
		</div>
	)
}
