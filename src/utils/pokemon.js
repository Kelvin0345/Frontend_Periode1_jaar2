export const teams = [
  { id: 'team-a', name: 'Team A', pokemonIds: [1, 4, 7] },
  { id: 'team-b', name: 'Team B', pokemonIds: [25, 39, 52] },
  { id: 'team-c', name: 'Team C', pokemonIds: [133, 152, 155] },
]

const TEAM_STORAGE_KEY = 'pokemon-teams'

export function getPokemonId(url) {
  return Number(url.match(/\/pokemon\/(\d+)\/?$/)?.[1])
}

export function getTeamPokemonIds(teamId) {
  const savedTeams = localStorage.getItem(TEAM_STORAGE_KEY)
  if (!savedTeams) {
    return teams.find((team) => team.id === teamId)?.pokemonIds ?? []
  }
  const parsedTeams = JSON.parse(savedTeams)
  return parsedTeams[teamId] ?? teams.find((team) => team.id === teamId)?.pokemonIds ?? []
}

export function saveTeamPokemonIds(teamId, pokemonIds) {
  const savedTeams = localStorage.getItem(TEAM_STORAGE_KEY)
  const parsedTeams = savedTeams ? JSON.parse(savedTeams) : {}
  localStorage.setItem(
    TEAM_STORAGE_KEY,
    JSON.stringify({ ...parsedTeams, [teamId]: pokemonIds }),
  )
}