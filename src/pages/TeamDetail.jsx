import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTeamPokemonIds, teams } from '../utils/pokemon'

function TeamDetail() {
  const { teamId } = useParams()
  const team = teams.find((item) => item.id === teamId)
  const [pokemon, setPokemon] = useState([])
  const [loadError, setLoadError] = useState('')
  const [teamPokemonIds, setTeamPokemonIds] = useState(() =>
    team ? getTeamPokemonIds(team.id) : [],
  )

  useEffect(() => {
    if (!team) return undefined

    const controller = new AbortController()
    const ids = getTeamPokemonIds(team.id)
    setPokemon([])
    setLoadError('')
    setTeamPokemonIds(ids)

    Promise.all(ids.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Teamgegevens konden niet worden opgehaald (${response.status}).`)
          }
          return response.json()
        }),
    ))
      .then(setPokemon)
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadError(error.message)
      })

    return () => controller.abort()
  }, [team])

  if (!team) {
    return (
      <main>
        <h1 className="page-heading">Team niet gevonden</h1>
        <Link className="button-link" to="/teams">Terug naar de teams</Link>
      </main>
    )
  }

  return (
    <main>
      <h1 className="page-heading team-title">{team.name}</h1>
      <p className="page-intro">Jouw Pokémon in dit team.</p>
      {loadError && <p className="status-message status-error" role="alert">{loadError}</p>}
      {!loadError && pokemon.length === 0 && teamPokemonIds.length === 0 && (
        <p className="status-message">Dit team is nog leeg. Voeg Pokémon toe via de lijst.</p>
      )}
      {!loadError && pokemon.length === 0 && teamPokemonIds.length > 0 && (
        <p className="status-message" role="status">Team laden...</p>
      )}
      <ul className="pokemon-list team-roster">
        {pokemon.map((member) => (
          <li className="pokemon-row" key={member.id}>
            <span className="pokemon-art">
              <img src={member.sprites.front_default} alt="" />
            </span>
            <div className="pokemon-row-info">
              <h2>{member.name}</h2>
              <p>Type: {member.types.map(({ type }) => type.name).join(', ')}</p>
            </div>
            <Link className="text-link" to={`/detail/${member.id}`}>Details</Link>
          </li>
        ))}
      </ul>
      <Link className="button-link" to={`/list?team=${team.id}`}>Toevoegen</Link>
    </main>
  )
}

export default TeamDetail
