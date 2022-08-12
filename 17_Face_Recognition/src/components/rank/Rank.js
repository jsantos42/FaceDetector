import './style.css'

const Rank = ({user}) => {
    return (
        <div className={'rank center'}>
            <p>{`${user.name}, your current entry count is ...`}</p>
            <p>{`${user.entries}`}</p>
        </div>
    )
}

export default Rank;