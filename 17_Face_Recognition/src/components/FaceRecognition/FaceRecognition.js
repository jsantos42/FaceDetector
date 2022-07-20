import './style.css'
import {Component} from "react";

const FaceRecognition = ({imgUrl, box}) => {
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
                <div
                    className={'box'}
                    style={{
                        top: `${box.topRow}%`,      // The percentages make it responsive
                        right: `${box.rightCol}%`,
                        bottom: `${box.bottomRow}%`,
                        left: `${box.leftCol}%`,
                    }}
                ></div>
                <div className={'test'}></div>
            </div>
        )
    }
}

export default FaceRecognition;