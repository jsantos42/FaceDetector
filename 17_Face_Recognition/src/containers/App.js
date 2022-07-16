import './App.css';
import Nav from "../components/nav/Nav";
import Logo from "../components/logo/Logo";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import Rank from "../components/rank/Rank";
import ParticlesBg from "../components/ParticlesBg";

function App() {
    return (
        <div className="app">
            <ParticlesBg />
            <Nav />
            <Logo />
            <Rank />
            <ImageLinkForm />
            {/*<FaceRecognition />*/}
        </div>
    );
}

export default App;
