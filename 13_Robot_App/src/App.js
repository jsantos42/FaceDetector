import {useState, useEffect} from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";

const App = () => {
    const [robots, setRobots] = useState([]); // if the initial state was an empty string, it wouldn't work
    const [searchField, setSearchField] = useState('');
    // const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(users => setRobots(users));
        // setCount(count + 1);
        // console.log(count)
    }, []) // this empty array as a second parameter is paramount to avoid
    // an infinite loop of fetching. After the 1st time, the
    // useEffect will only run again whenever its dependencies
    // change (this way, there are no dependencies!)

    const filterOnSearch = (e) => setSearchField(e.target.value);
    const filteredRobots = robots.filter(i =>
        i.name.toLowerCase().includes(searchField.toLowerCase()));
    return robots.length
        ? <div className='tc'>
            <h1>RoboFriends</h1>
            <SearchBox filterOnSearch={filterOnSearch}/>
            <CardList robots={filteredRobots}/>
        </div>
        : <h1>Loading</h1>
}

export default App;