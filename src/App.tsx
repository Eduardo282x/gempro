import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'
import 'material-icons/iconfont/material-icons.css';
import "react-multi-carousel/lib/styles.css";
import { Login } from './pages/login/Login';
import { Admin } from './pages/admin/Admin';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/reports" element={<Admin />} />
          <Route path="/admin/workers" element={<Admin />} />
          <Route path="/admin/companies" element={<Admin />} />
          <Route path="/admin/files" element={<Admin />} />
          <Route path="/admin/profile" element={<Admin />} />

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
