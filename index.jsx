import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, About, Vans, VanDetails, Host, Reviews, Income, HostVans, HostVanDetails, HostVanPricing, HostVanPhotos, NotFound, Login, Error} from "/pages"
import { vansLoader, hostVansLoader, loginLoader } from "/pages"
import { loginAction } from "/pages"
import { Header, Footer } from "/components"
import { MainLayout, HostLayout, HostVanLayout, AuthRequired } from "/layouts"
import { RouterProvider, createRoutesFromElements, createBrowserRouter, Route, Link } from "react-router-dom"
import "./server"

const browserRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route element={<AuthRequired/>}>
      <Route path="/host" element={<HostLayout/>}>
        <Route path="vans" element={<HostVans/>} loader={ hostVansLoader } errorElement={<Error/>}/>
        <Route index element={<Host/>}/>
        <Route path="reviews" element={<Reviews/>}/>
        <Route path="income" element={<Income/>}/>
        <Route path="vans/:id" element={<HostVanLayout/>}>
          <Route index element={<HostVanDetails/>}/>
          <Route path="photos" element={<HostVanPhotos/>}/>
          <Route path="pricing" element={<HostVanPricing/>}/>
        </Route>
      </Route>
    </Route>
    <Route path="vans" element={<Vans/>} loader={vansLoader} errorElement={<Error/>}/>
    <Route path="vans/:id" element={<VanDetails/>}/>
    <Route path="login" element={<Login/>} loader={loginLoader} action={loginAction}/>
    <Route path="*" element={<NotFound/>}/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={browserRouter}/>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);


  /* 
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
  
  */