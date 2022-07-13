import './style.css';
import Title from "../components/Title";
import SearchBox from "../components/SearchBox";
import {Component} from "react";
import PokemonList from "./PokemonList";

class App extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            searchField: '',
            pokemons: []
        }
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        isLoaded: true,
                        pokemons: res.results // .results (in case of this api) is paramount!
                    })
                },
                error => this.setState({error})
            )
    }

    updateSearchField = (e) => {
        this.setState({searchField: e.target.value})
    }

    render() {
        const {error, isLoaded, searchField, pokemons} = this.state;
        const filteredPokemons = pokemons.filter(
            pokemon => pokemon.name.includes(searchField)
        );
        if (error)
            return <div className='app'>Error: {error.message}</div>
        else if (!isLoaded)
            return <div className='app'>Loading...</div>
        return (
            <div className='app'>
                <Title>Pokemons</Title>
                {/*<h2>Search here:</h2>*/}
                <SearchBox onTyping={this.updateSearchField}/>
                <PokemonList pokemon={filteredPokemons}/>
            </div>
        );
    }
}

export default App;
