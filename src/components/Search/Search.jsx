import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./Search.css"

const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=150";

const Search = () => {
    const [characters, setCharacters] = useState([])
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                const characters = response.data.results;

                const charactersWithImages = await Promise.all(
                    characters.map(async (character) => {
                      const detailResponse = await axios.get(character.url);
                      return {
                        name: character.name,
                        imageUrl: detailResponse.data.sprites.front_default,
                      };
                    })
                  );
                
                setCharacters(charactersWithImages);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        }
        fetchData();
    }, [])

    const searchPokemon = (e) => {
        const searchValue = e.target.value;
        setPokemon(characters.filter((character) => character.name.toLowerCase().includes(searchValue)));
    };


    return (
        <form>
            <span>Pokemon :</span>
            <input type="text" name="name" id="name" onChange={searchPokemon} />
            <div>{pokemon.map((poke, index) => (
                <p key={index}>
                    {poke.name}
                    <img src={poke.imageUrl}/>
                </p>
            ))}</div>
        </form>
    )
}

export default Search