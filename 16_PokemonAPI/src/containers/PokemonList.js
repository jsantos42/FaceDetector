import {Component} from "react";
import CardList from "./CardList";
import './style.css'

const PokemonList = ({pokemon}) => {
    const PokemonArray = pokemon.map(i =>
        <div className='card'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i.url.slice(34, -1)}.png`}/>
            <p>{i.name.toUpperCase()}</p>
        </div>
    )

    return (
        <CardList >
            {PokemonArray}
        </CardList>
    )
}

export default PokemonList;