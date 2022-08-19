import './style.css'

const Rank = ({user}) => {
    return (
        <div className={'rank center'}>
			<p>Welcome to the Face Detector, <span className={'highlight'}>{user.name}</span>!</p>
			<p>You have used this API <span className={'highlight'}>{user.entries}</span> times!</p>
        </div>
    )
}

export default Rank;