import { MapContainer } from 'react-leaflet/MapContainer'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Map from './components/Map/Map'
import EditPage from './components/EditPage/EditPage'
import Navbar from './components/Navbar/Navbar'
import './index.sass'
import "leaflet/dist/leaflet.css"
function App() {

  return (
    <div>
        <BrowserRouter>
        <Navbar />
          <Routes>
              <Route index element={<Map />} />
              <Route path="/edit" element={<EditPage />} />
              <Route path="*" />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
