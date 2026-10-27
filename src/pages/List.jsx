import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Footer from '../components/footer'
import PokemonList from '../components/Pokemonlist'
import DetailButton from '../components/DetailButton'

function List() {

  return (
    <>
      <Navigation/>
      <Header/>
      <PokemonList/>
      <Footer/>
    </>
  )
}

export default List