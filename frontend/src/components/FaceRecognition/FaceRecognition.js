import './style.css'

const FaceRecognition = ({imgUrl, box}) => {
	const squares = box.map((i, index) =>
		<div
			key={index}
			className={'box'}
			style={{
				top: `${i.topRow}%`,      // The percentages make it responsive
				right: `${i.rightCol}%`,
				bottom: `${i.bottomRow}%`,
				left: `${i.leftCol}%`,
			}}
		></div>
	)
	
	if (imgUrl.length !== 0) {
		return (
			<div className={'center face'}>
				<img
					id={'inputImage'}
					src={imgUrl}
                    alt={"Check the URL, couldn't get an image"}
                    onError={({currentTarget}) => {
                        currentTarget.src = "";
                        currentTarget.alt = "";
                    }}
                />
				{squares}
                <div className={'test'}></div>
            </div>
        )
    }
}

export default FaceRecognition;