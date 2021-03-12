import {
	ChangeEventHandler,
	FormEventHandler,
	createContext,
	useEffect,
	useState
} from 'react'

interface SessionContextData {
	name: string
	state: number
	listOfStates: Array<Object>
	username: string
	password: string
	isSigningUp: Boolean
	isLoggedIn: Boolean
	isMakingRequest: Boolean
	request: Array<Object>
	requestTitle: string
	requestDescription: string
	requestValue: number
	isMatchModalOpen: Boolean
	lawyerName: string
	goSignUp: () => void
	goLogin: () => void
	goMakeRequest: () => void
	goCheckRequests: () => void
	handleNameChange: ChangeEventHandler<HTMLInputElement>
	handleStateChange: ChangeEventHandler<HTMLSelectElement>
	handleUsernameChange: ChangeEventHandler<HTMLInputElement>
	handlePasswordChange: ChangeEventHandler<HTMLInputElement>
	handleRequestTitleChange: ChangeEventHandler<HTMLInputElement>
	handleRequestDescriptionChange: ChangeEventHandler<HTMLTextAreaElement>
	handleRequestValueChange: ChangeEventHandler<HTMLInputElement>
	handleSubmitLogin: FormEventHandler<HTMLFormElement>
	handleSubmitRequest: FormEventHandler<HTMLFormElement>
	getListOfRequests: () => void
	closeMatchModal: () => void
}

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({
	children,
	...rest
}) {
	// This is for local hosting ONLY, don't uncomment
	// const serveraddress = "http://localhost:3001"
	// Do not comment the line above unless you are on development
	const serveraddress = "https://desafio-resolvvi-server.herokuapp.com"

	const [user, setUser] = useState({})
	const [name, setName] = useState("")
	const [state, setState] = useState(0)
	const [listOfStates, setListOfStates] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [isSigningUp, setIsSigningUp] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isMakingRequest, setIsMakingRequest] = useState(false)
	const [request, setRequest] = useState([])
	const [requestTitle, setRequestTitle] = useState("")
	const [requestDescription, setRequestDescription] = useState("")
	const [requestValue, setRequestValue] = useState()
	const [isMatchModalOpen, setIsMatchModalOpen] = useState(false)
	const [lawyerName, setLawyerName] = useState("")



	useEffect(() => {
		const token = localStorage.getItem("token")
		token ? (
			fetch(`${serveraddress}/auto_login`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then(resp => resp.json())
				.then(data => {
					setUser(data)
					setIsLoggedIn(true)
				})
		) : null
	}, [])

	function goSignUp() {
		setIsSigningUp(true)
		fetch(`${serveraddress}/states`)
			.then(resp => resp.json())
			.then(data => {
				setListOfStates(data)
			})
	}

	function goLogin() {
		setIsSigningUp(false)
	}

	function goMakeRequest() {
		setIsMakingRequest(true)
	}

	function goCheckRequests() {
		setIsMakingRequest(false)
		getListOfRequests()
	}

	function handleNameChange(event) {
		setName(event.target.value)
	}

	function handleStateChange(event) {
		console.log(event.target.value)
		setState(event.target.value)
	}

	function handleUsernameChange(event) {
		setUsername(event.target.value)
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value)
	}

	function handleRequestTitleChange(event) {
		setRequestTitle(event.target.value)
	}

	function handleRequestDescriptionChange(event) {
		setRequestDescription(event.target.value)
	}

	function handleRequestValueChange(event) {
		setRequestValue(event.target.value)
	}

	function handleSubmitLogin(event) {
		const routeTo = isSigningUp ? "signup" : "login"

		event.preventDefault()
		fetch(`${serveraddress}/${routeTo}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({
				user: {
					name,
					state_id: state,
					email: username,
					password
				}
			})
		}).then(resp => {
			const { headers } = resp
			localStorage.setItem("token", headers.get("Authorization"))
			return resp.json()
		})
			.then(data => {
				setUser(data)
				setIsLoggedIn(true)
				getListOfRequests()
			}).catch(error => {
				alert(error.message)
			})
		setName("")
		setUsername("")
		setPassword("")
	}

	function handleSubmitRequest(event) {
		const token = localStorage.getItem("token")

		event.preventDefault()
		fetch(`${serveraddress}/requests`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": token
			},
			body: JSON.stringify({
				request: {
					title: requestTitle,
					description: requestDescription,
					value: requestValue
				}
			})
		}).then(resp => resp.json())
			.then(data => {
				setLawyerName(data.user.lawyer.name)
				setIsMatchModalOpen(true)
			})
		setRequestDescription("")
		setRequestValue(null)
	}

	function getListOfRequests() {
		const token = localStorage.getItem("token")

		fetch(`${serveraddress}/requests`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": token
			}
		}).then(resp => resp.json())
			.then(data => {
				setRequest(data)
			})
	}

	function closeMatchModal() {
		setIsMatchModalOpen(false)
	}

	return (
		<SessionContext.Provider
			value={{
				name,
				state,
				listOfStates,
				username,
				password,
				isSigningUp,
				isLoggedIn,
				isMakingRequest,
				request,
				requestTitle,
				requestDescription,
				requestValue,
				isMatchModalOpen,
				lawyerName,
				goSignUp,
				goLogin,
				goMakeRequest,
				goCheckRequests,
				handleNameChange,
				handleStateChange,
				handleUsernameChange,
				handlePasswordChange,
				handleRequestTitleChange,
				handleRequestDescriptionChange,
				handleRequestValueChange,
				handleSubmitLogin,
				handleSubmitRequest,
				getListOfRequests,
				closeMatchModal
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}
