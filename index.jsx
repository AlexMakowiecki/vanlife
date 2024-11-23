import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, About, Vans, VanDetails, Host, Reviews, Income, HostVans, HostVanDetails, HostVanPricing, HostVanPhotos, NotFound, Login} from "/pages"
import { Header, Footer } from "/components"
import { MainLayout, HostLayout, HostVanLayout, AuthRequired } from "/layouts"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./server"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route element={<AuthRequired/>}>
            <Route path="/host" element={<HostLayout/>}>
              <Route index element={<Host/>}/>
              <Route path="reviews" element={<Reviews/>}/>
              <Route path="income" element={<Income/>}/>
              <Route path="vans" element={<HostVans/>}/>
              <Route path="vans/:id" element={<HostVanLayout/>}>
                <Route index element={<HostVanDetails/>}/>
                <Route path="photos" element={<HostVanPhotos/>}/>
                <Route path="pricing" element={<HostVanPricing/>}/>
              </Route>
            </Route>
          </Route>
          <Route path="vans" element={<Vans/>}/>
          <Route path="vans/:id" element={<VanDetails/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);