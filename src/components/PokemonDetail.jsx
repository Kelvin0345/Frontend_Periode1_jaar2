import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetail() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
      });
  }, [id]);

  if (!pokemon) {
    return <p>Pokémon laden...</p>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>

      <h2>Types</h2>

      <ul>
        {pokemon.types.map(type => (
          <li key={type.type.name}>
            {type.type.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetail;
