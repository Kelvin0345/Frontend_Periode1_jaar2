import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/">List</Link>
          <Link to="/">Details</Link>

        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<List />} />
          <Route path="/" element={<Detail />} />
          
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
