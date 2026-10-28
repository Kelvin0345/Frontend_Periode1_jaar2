import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  getPokemonId,
  getTeamPokemonIds,
  saveTeamPokemonIds,
  teams,
} from '../utils/pokemon'

function PokemonList() {
  const [pokemons, setPokemons] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('pokemon-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [loadError, setLoadError] = useState('')
  const [searchParams] = useSearchParams()
  const teamId = searchParams.get('team')
  const selectedTeam = teams.find((team) => team.id === teamId)
  const [addedIds, setAddedIds] = useState(() =>
    selectedTeam ? getTeamPokemonIds(selectedTeam.id) : [],
  )

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Pokémon konden niet worden opgehaald (${response.status}).`)
        }
        return response.json()
      })
      .then((data) => setPokemons(data.results))
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadError(error.message)
      })

    return () => controller.abort()
  }, [])

  function toggleFavorite(id) {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id]
    setFavorites(updatedFavorites)
    localStorage.setItem('pokemon-favorites', JSON.stringify(updatedFavorites))
  }

  function addToTeam(id) {
    const updatedIds = [...new Set([...getTeamPokemonIds(selectedTeam.id), id])]
    saveTeamPokemonIds(selectedTeam.id, updatedIds)
    setAddedIds(updatedIds)
  }

  return (
    <section>
      <h1 className="page-heading">Pokémonlijst</h1>
      <p className="page-intro">
        {selectedTeam
          ? `Kies Pokémon om toe te voegen aan ${selectedTeam.name}.`
          : 'Ontdek de eerste Pokémon en bekijk hun gegevens.'}
      </p>
      {loadError && <p className="status-message status-error" role="alert">{loadError}</p>}
      {!loadError && pokemons.length === 0 && (
        <p className="status-message" role="status">Pokémon laden...</p>
      )}
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => {
          const id = getPokemonId(pokemon.url)
          const isFavorite = favorites.includes(id)
          const isAdded = addedIds.includes(id)
          return (
            <li className="pokemon-row" key={pokemon.name}>
              <span className="pokemon-art">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt=""
                  loading="lazy"
                />
              </span>
              <div className="pokemon-row-info">
                <h2><Link to={`/detail/${id}`}>{pokemon.name}</Link></h2>
                <p>Pokémon #{String(id).padStart(3, '0')}</p>
              </div>
              <div className="pokemon-row-actions">
                {selectedTeam && (
                  <button
                    className="add-button"
                    disabled={isAdded}
                    onClick={() => addToTeam(id)}
                    type="button"
                  >
                    {isAdded ? 'Toegevoegd' : 'Toevoegen'}
                  </button>
                )}
                <button
                  aria-label={isFavorite ? `${pokemon.name} uit favorieten verwijderen` : `${pokemon.name} toevoegen aan favorieten`}
                  aria-pressed={isFavorite}
                  className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
                  onClick={() => toggleFavorite(id)}
                  type="button"
                >
                  ★
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PokemonList