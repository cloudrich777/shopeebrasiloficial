import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

// Import das rotas
import ProductPage from './routes/index'
import Checkout from './routes/checkout'
import Pix from './routes/pix'
import Sucesso from './routes/sucesso'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pix" element={<Pix />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)