import { useState, useEffect } from 'react';
import DetailButton from './DetailButton';

function Pokemon(props) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        console.log(props.url);

        fetch(props.url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Fout bij ophalen Pokémon");
                }

                return res.json();
            })
            .then(data => {
                console.log("Pokémon gegevens:", data);
                setPokemon(data);
            })
            .catch(error => {
                console.error("Er is iets misgegaan:", error);
            });
    }, [props.url]);

    return (
        <>
            <p>{props.url}</p>

            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>

                    <p>Gewicht: {pokemon.weight}</p>

                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />

                    <DetailButton id={pokemon.id} />
                </div>
            )}
        </>
    );
}

export default Pokemon;