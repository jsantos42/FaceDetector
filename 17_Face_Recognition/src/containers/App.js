import {useState} from "react";
import {loadFull} from "tsparticles";
import Clarifai from 'clarifai'
// For some reason, I cannot import styled-components the normal way (probably
// because of the Clarify API making me use ReactApp v4
// import styled from "styled-components";
import styled from "styled-components/dist/styled-components.js";

import myAPIKey from "../api";
import Nav from "../components/nav/Nav";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import Rank from "../components/rank/Rank";
import ParticlesBg from "../components/particlesBg/ParticlesBg";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignForm from "../components/signForm/SignForm";

//==============================================================================
// PARTICLES BACKGROUND
//==============================================================================
// This must be passed as a parameter to the component, otherwise it will
// rerender everytime we write a character in input.
const particlesInit = async (main) => await loadFull(main);


//==============================================================================
// API INITIALIZATION
//==============================================================================
const clarifai = new Clarifai.App({
    apiKey: myAPIKey,
})


//==============================================================================
// APP STYLING
//==============================================================================
const AppDiv = styled.div`
  min-height: 100vh;
  
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .col {
    display: flex;
    flex-direction: column;
  }

  a {
    cursor: pointer;
  }
  
  button {
    cursor: pointer;
  }
`;


//==============================================================================
// APP ITSELF
//==============================================================================
const App = () => {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [faceBox, setFaceBox] = useState({});
    const [route, setRoute] = useState('signForm');
    const [form, setForm] = useState('signIn');

    const getFaceBox = (data) => {
        // for (let i in data.outputs[0].data.regions) {
        let faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
        // console.log("bounding box", faceBox);
        return {
            leftCol: faceBox.left_col * 100,
            topRow: faceBox.top_row * 100,
            rightCol: (1 - faceBox.right_col) * 100,
            bottomRow: (1 - faceBox.bottom_row) * 100,
        }
        // }
    }

    const displayFaceBox = box => setFaceBox(box);

    const onInputChange = (e) => setInput(e.target.value);

    const onFormChange = (form) => setForm(form);

    const onButtonSubmit = (e) => {
        setImageUrl(input);
        clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, input)
            .then(response => displayFaceBox(getFaceBox(response)))
            .catch(error => console.log(error));
    }

    // The preventDefault() avoids the warning "Form submission canceled because
    // the form is not connected"
    const onRouteChange = (event, route) => {
        setRoute(route);
        event.preventDefault();
    }

    return (
        <AppDiv>
            {/*<ParticlesBg init={particlesInit}/>*/}
            <Nav onRouteChange={onRouteChange} route={route}/>
            {route === 'signForm'
                ? <SignForm form={form} onRouteChange={onRouteChange} onFormChange={onFormChange}/>
                : <>
                    <Rank/>
                    <ImageLinkForm onChange={onInputChange} onSubmit={onButtonSubmit}/>
                    <FaceRecognition imgUrl={imageUrl} box={faceBox}/>
                </>
            }
        </AppDiv>
    );
}

export default App;
