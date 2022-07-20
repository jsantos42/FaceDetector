import './App.css';
import Nav from "../components/nav/Nav";
import Logo from "../components/logo/Logo";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import Rank from "../components/rank/Rank";
import ParticlesBg from "../components/particlesBg/ParticlesBg";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import {Component} from "react";
import Clarifai from 'clarifai'
import apiKey from "../api";
import {loadFull} from "tsparticles";
import SignIn from "../components/signIn/SignIn";

// This must be passed as a parameter to the component, otherwise it will
// rerender everytime we write a character in input.
const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
};

//API initialization
const clarifai = new Clarifai.App({
    apiKey: apiKey,
})

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            faceBox: {},
        }
    }

    getFaceBox = (data) => {
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

    displayFaceBox = box => {
        this.setState({faceBox: box});
        console.log('display', box);
    }

    onInputChange = (e) => this.setState({input: e.target.value})

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.displayFaceBox(this.getFaceBox(response)))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="app">
                {/*<ParticlesBg init={particlesInit}/>*/}
                <Nav/>
                <Logo/>
                <SignIn />
                {/*<Rank/>*/}
                {/*<ImageLinkForm onChange={this.onInputChange} onSubmit={this.onButtonSubmit}/>*/}
                {/*<FaceRecognition imgUrl={this.state.imageUrl} box={this.state.faceBox}/>*/}
            </div>
        );
    }
}

export default App;
