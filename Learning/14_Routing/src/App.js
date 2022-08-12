import React from 'react';
import Navbar from './Components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route  path="/" element={<Home />}></Route>
                    <Route  path="/contact" element={<Contact/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                </Routes>
                {/*this anchor element will always re-render the entire page
                (and not just what has changed; also, it will refresh the page
                even if the link is pointing to the current page*/}
                <a href="/">newhome</a>
            </BrowserRouter>
        </div>
    );
}

export default App;
