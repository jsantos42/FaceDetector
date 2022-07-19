import './style.css'
import {Component} from "react";

const FaceRecognition = ({imgUrl}) => {
    if (imgUrl.length !== 0) {
        return (
            <div className={'center face'}>
                <img
                    src={imgUrl}
                    alt={"Check the URL, couldn't get an image"}
                    onError={({currentTarget}) => {
                        currentTarget.src = "";
                        currentTarget.alt = "";
                    }}
                />
            </div>
        )
    }
}

export default FaceRecognition;