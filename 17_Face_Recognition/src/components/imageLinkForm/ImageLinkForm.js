import './style.css'

const ImageLinkForm = ({onChange, onSubmit}) => {
    return (
        <div className={'main center'}>
            <p>Insert a link to an image, I will detect the faces on it!</p>
            <div className={'formBg center'}>
                <div className={'form center'}>
                    <input
                        type={'text'}
                        onChange={onChange}
                        onKeyUp={e => {
                            if (e.key === 'Enter')
                                return onSubmit(e);
                        }}
                    />
                    <button onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )

}

export default ImageLinkForm;