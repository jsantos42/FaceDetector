import './style.css'

const ImageLinkForm = ({onChange, onSubmit}) => {
    return (
        <div className={'main center'}>
            <div className={'formBg center'}>
                <div className={'form center'}>
                    <input
                        type={'text'}
                        onChange={onChange}
						placeholder={'Paste a link to an image with people'}
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