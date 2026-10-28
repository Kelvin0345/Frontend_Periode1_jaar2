import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Detail from './pages/Detail'
import Home from './pages/Home'
import List from './pages/List'
import TeamDetail from './pages/TeamDetail'
import Teams from './pages/Teams'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <nav className="site-nav" aria-label="Hoofdnavigatie">
            <Link to="/">Home</Link>
            <Link to="/teams">Teamlijst</Link>
            <Link to="/list">Pokémonlijst</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/detail" element={<Navigate to="/list" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
