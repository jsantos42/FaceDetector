import Tilty from 'react-tilty'
import Ai from './chip.png'

const Logo = () => {
    const div = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    }
    const img = {
        width: '100px',
    }

    return (
        <div style={div}>
            <Tilty max={35} perspective={1000} reverse>
                <img src={Ai} alt={'logo'} style={img}/>
            </Tilty>
        </div>
    )

}

export default Logo;