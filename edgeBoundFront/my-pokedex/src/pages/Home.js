import React, { useState } from 'react';
import PokemonDetail from '../components/PokemonDetail';

function Home() {
    const [pokemonName, setPokemonName] = useState(''); 
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null); 
    const handleInputChange = (event) => {
      setPokemonName(event.target.value); 
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (pokemonName.trim() === '') return; 
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const data = await response.json();
        setPokemonData(data);
        setError(null);
      } catch (error) {
        setPokemonData(null); 
        setError('No existe ese pokemon'); 
      }
  };

  return (
    <div className="container">
        <h1 className="mt-5 mb-4" style={{ color: 'white' }}>Detalles de pokemon...</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Ingresa el nombre del pokemón"
                value={pokemonName}
                onChange={handleInputChange}
                />
                <button className="btn btn-primary" type="submit">Buscar</button>
            </div>
        </form>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {pokemonData ? (
                  <PokemonDetail pokemon={pokemonData} />
                ) : (
                  error && <div className="alert alert-danger mt-3">{error}</div>
                )}
            </div>
        </div>
    </div>
  );
}

export default Home;
