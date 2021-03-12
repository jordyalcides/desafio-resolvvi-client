import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'
import styles from '../styles/components/Header.module.css'

export function Header() {
	const {
		isLoggedIn,
		goSignUp,
		goLogin,
		goMakeRequest,
		goCheckRequests
	} = useContext(SessionContext)

	return (
		<div className={styles.headerContainer}>
			<img src="/svg/main-logo.svg" alt="Logo da Resolvvi" />
			<nav>
				{isLoggedIn ? (
					<>
						<button
							type="button"
							onClick={goMakeRequest} >
							Fazer um pedido
						</button>
						<button
							type="button"
							onClick={goCheckRequests} >
							Meus pedidos
						</button>
					</>
				) : (
					<>
						<button
							type="button"
							onClick={goLogin} >
							Entrar
						</button>
						<button
							type="button"
							onClick={goSignUp} >
							Começar
						</button>
					</>
				)}

			</nav>
		</div>
	)
}