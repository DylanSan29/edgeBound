import React, { useState, useEffect } from 'react';
import './PokemonDetail.css';
const PokemonDetail = ({ pokemon }) => {
    // eslint-disable-next-line
    const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };
    fetchPokemonData();
  }, [pokemon.name, setPokemonData]); 

  return (
    <div className="containerPokemon">
      <div className="row">
        <div className="col">
            <h2 style={{ textTransform: 'uppercase' }}>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="col">
          <div className="pokemon-types">
            <h3>Tipo:</h3>
            <ul className="list-group">
              {pokemon.types.map((type, index) => (
                <li key={index} className="list-group-item">{type.type.name}</li>
              ))}
            </ul>
          </div>
          <div className="pokemon-abilities">
            <h3>Habilidades:</h3>
            <ul className="list-group">
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="list-group-item">{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
