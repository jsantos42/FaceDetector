import './style.css'

const ImageLinkForm = () => {
    return (
        <div className={'main center'}>
            <p>Insert a link to an image, I will detect the faces on it!</p>
            <div className={'formBg center'}>
                <div className={'form center'}>
                    <input type={'text'}/>
                    <button>Detect</button>
                </div>
            </div>
        </div>
    )

}

export default ImageLinkForm;