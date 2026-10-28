import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setPokemon(null)
    setLoadError('')
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Pokémongegevens konden niet worden opgehaald (${response.status}).`)
        }
        return response.json()
      })
      .then((data) => setPokemon(data))
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadError(error.message)
      })

    return () => controller.abort()
  }, [id])

  if (loadError) {
    return <p className="status-message status-error" role="alert">{loadError}</p>
  }
  if (!pokemon) {
    return <p className="status-message" role="status">Pokémon laden...</p>
  }

  const artwork = pokemon.sprites.other['official-artwork'].front_default
    || pokemon.sprites.front_default

  return (
    <section>
      <h1 className="page-heading detail-title">Pokémon Detail</h1>
      <div className="detail-layout">
        <section className="detail-panel">
          <h2>Pokémongegevens</h2>
          <p className="detail-pokemon-name">{pokemon.name}</p>
          <dl className="detail-stats">
            <div><dt>Hoogte</dt><dd>{pokemon.height / 10} m</dd></div>
            <div><dt>Gewicht</dt><dd>{pokemon.weight / 10} kg</dd></div>
            <div><dt>Type</dt><dd>{pokemon.types.map(({ type }) => type.name).join(', ')}</dd></div>
            <div><dt>Ervaring</dt><dd>{pokemon.base_experience ?? 'Onbekend'}</dd></div>
          </dl>
        </section>
        <div className="detail-image">
          <img src={artwork} alt={pokemon.name} />
        </div>
      </div>
    </section>
  )
}

export default PokemonDetail
