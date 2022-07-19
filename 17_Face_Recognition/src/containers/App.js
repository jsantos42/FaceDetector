import './App.css';
import Nav from "../components/nav/Nav";
import Logo from "../components/logo/Logo";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import Rank from "../components/rank/Rank";
import ParticlesBg from "../components/ParticlesBg";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import {Component} from "react";
import Clarifai from 'clarifai'
import apiKey from "../api";
import {loadFull} from "tsparticles";

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
        }
        this.onInputChange = this.onInputChange.bind(this);

    }

    onInputChange(e) {
        this.setState({input: e.target.value})
    }

    onButtonSubmit = (e) => {
        this.setState({imageUrl: this.state.input})
        clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                for (let i in response.outputs[0].data.regions) {
                    console.log("bounding box", response.outputs[0].data.regions[i].region_info.bounding_box);
                }
            },
            function (error) {
                console.log(error);
            }
        );
    }

    render() {
        return (
            <div className="app">
                <ParticlesBg init={particlesInit} />
                <Nav/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onChange={this.onInputChange} onSubmit={this.onButtonSubmit}/>
                <FaceRecognition imgUrl={this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
