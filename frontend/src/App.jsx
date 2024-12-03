import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/header'
import HomePage from './pages/home/HomePage'
import RcmCar from './pages/rcmCar/rcmCar'
import CarChart from './pages/chart/carChart'
function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path='/chart' element={<CarChart/>}></Route>
          <Route path='/recommendation' element={<RcmCar/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
