import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* <Route element={<Layout></Layout>}>
            <Route path="/home" element={<Home />} />
            <Route path="/carrito" element={<Card />} />
            <Route path="/inventario" element={<Inventory />} />
          </Route> */}
          
        </Routes >
      </BrowserRouter>
    </>
  )
}

export default App
