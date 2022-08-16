import {useState} from "react";
import {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme} from "../themes";
import moon from '../res/themeSwitches/moon.png';
import sun from '../res/themeSwitches/sun.png';
import {pages} from "../data";
import GlobalStyle from "./GlobalStyle";
import Nav from './Nav'
import Footer from "./Footer";
import Home from "../pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    const [themeData, setThemeData] = useState({
        theme: darkTheme,
        themeSwitcher: sun,
    });

    const switchTheme = () => {
        if (themeData.theme.name === 'light')
            setThemeData({
                theme: darkTheme,
                themeSwitcher: sun,
            });
        else
            setThemeData({
                theme: lightTheme,
                themeSwitcher: moon,
            });
    }

    return (
        <ThemeProvider theme={themeData.theme}>
            <GlobalStyle/>
            <BrowserRouter>
                <Nav themeData={themeData} onSwitchTheme={switchTheme}/>
                <Routes>
                   <Route path={pages.home.path} element={<Home/>}/>
                    {/*<Route path={pages.about} element={<About/>}/>*/}
                    {/*<Route path={pages.services} element={<Services/>}/>*/}
                    {/*<Route path={pages.psychology} element={<Psychology/>}/>*/}
                    {/*<Route path={pages.nutrition} element={<Nutrition/>}/>*/}
                    {/*<Route path={pages.exercise} element={<Exercise/>}/>*/}
                    {/*<Route path={pages.pilates} element={<Pilates/>}/>*/}
                    {/*<Route path={pages.program} element={<Program/>}/>*/}
                    {/*<Route path={pages.company} element={<Company/>}/>*/}
                    {/*<Route path={pages.reviews} element={<Reviews/>}/>*/}
                    {/*<Route path={pages.contacts} element={<Contacts/>}/>*/}
                    {/*<Route path="*" element={<NotFound/>}/>*/}
                </Routes>
                <Footer/>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;