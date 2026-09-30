import { useEffect, useState } from "react";
import Pokemon from "./pokemon";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setPokemons(data.results);
      });
  }, []);

  return (
    <div>
      <h1>Pokémon Lijst</h1>
      <ul>
        {pokemons.map(p => (
          <li key={p.name}>{p.name}
            <Pokemon url={p.url}/>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;