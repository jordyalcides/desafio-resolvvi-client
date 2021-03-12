import { Header } from '../components/Header'
import { Login } from '../components/Login'
import { Request } from '../components/Request'
import { Requests } from '../components/Requests'
import { SessionProvider } from '../contexts/SessionContext'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
	return (
		<SessionProvider>
			<div className={styles.container}>
				<Header />
				<Login />
				<Request />
				<Requests />
			</div>
		</SessionProvider>
	)
}