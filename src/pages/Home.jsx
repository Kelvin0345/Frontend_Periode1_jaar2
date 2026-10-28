function Home() {
  return (
    <main className="home-page">
      <header className="home-title">
        <h1>Pokémon Site</h1>
      </header>
      <section className="home-feature-row">
        <div className="home-image home-placeholder">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
          />
        </div>
        <div className="home-copy">
          <h2>Pokémon ontdekken</h2>
          <p>Bekijk de eigenschappen en types van Pokémon.</p>
        </div>
      </section>
      <section className="home-feature-row is-reversed">
        <div className="home-image home-placeholder">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
            alt="Charizard"
          />
        </div>
        <div className="home-copy">
          <h2>Teams maken</h2>
          <p>Stel je eigen team samen met je favoriete Pokémon.</p>
        </div>
      </section>
    </main>
  )
}

export default Home