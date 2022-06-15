import React from "react";
import {robots} from "./robots";
import CardList from "./CardList";
import SearchBox from "./SearchBox";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            appRobots: robots,
            searchField: '',
        }
    }
    filterOnSearch = (e) => this.setState({ searchField: e.target.value });
    render() {
        const filteredRobots = this.state.appRobots.filter(i =>
            i.name.toLowerCase().includes(this.state.searchField.toLowerCase()));
        return (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox filterOnSearch={this.filterOnSearch}/>
                <CardList robots={filteredRobots}/>
            </div>
        );
    }
}

// const App = () => {
//     return (
//         <div className='tc'>
//             <h1>RoboFriends</h1>
//             <SearchBox />
//             <CardList robots={robots}/>
//         </div>
//     );
// }

export default App;