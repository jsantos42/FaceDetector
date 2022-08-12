import {NavLink} from "react-router-dom";
import {pages} from "../../data";

const isActive = (props) => props.isActive ? 'active' : 'inactive';

const PagesArray = () => {
    let res = [];
    for (let i in pages)
        res.push(
            <NavLink key={pages[i].name} to={pages[i].path} className={isActive}>
                <li>{pages[i].name}</li>
            </NavLink>)

    return res;
}

export default PagesArray;