import './App.css';
import Nav from "../components/nav/Nav";
import Logo from "../components/logo/Logo";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";

function App() {
    return (
        <div className="app">
            <Nav />
            <Logo />
            <ImageLinkForm />
            {/*<FaceRecognition />*/}
        </div>
    );
}

export default App;
