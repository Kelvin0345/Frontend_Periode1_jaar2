import { Link } from 'react-router-dom'
import { getTeamPokemonIds, teams } from '../utils/pokemon'

function Teams() {
  return (
    <main>
      <h1 className="page-heading">Teamlijst</h1>
      <p className="page-intro">Kies een team om de Pokémon te bekijken.</p>
      <ul className="team-list">
        {teams.map((team) => (
          <li key={team.id}>
            <Link className="team-card" to={`/teams/${team.id}`}>
              <span className="pokemon-art" aria-hidden="true">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${team.pokemonIds[0]}.png`}
                  alt=""
                />
              </span>
              <span className="team-card-info">
                <h2>{team.name}</h2>
                <p>{getTeamPokemonIds(team.id).length} Pokémon</p>
              </span>
              <span className="text-link">Bekijk team</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Teams