import {Component} from "react";
import CardList from "./CardList";
import './style.css'
import Card from "../components/Card";

const PokemonList = ({pokemon}) => {
    const PokemonArray = pokemon.map(i =>
        <Card
            img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i.url.slice(34, -1)}.png`}
            name={i.name.toUpperCase()}
            url={i.url}
        />
    )
    
    return (
        <CardList >
            {PokemonArray}
        </CardList>
    )
}

export default PokemonList;