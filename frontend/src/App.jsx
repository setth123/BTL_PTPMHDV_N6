import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/header'
import HomePage from './pages/home/HomePage'
import RcmCar from './pages/rcmCar/rcmCar'
import CarChart from './pages/chart/carChart'
import BankChart from './pages/chart/bankChart'
function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
<<<<<<< HEAD
          <Route path="/carChart" element={<CarChart/>}/>
          <Route path="/bankChart" element={<BankChart/>}/>
=======
          <Route path="/" element={<HomePage/>}/>
          <Route path='/chart' element={<CarChart/>}></Route>
          <Route path='/recommendation' element={<RcmCar/>}></Route>
>>>>>>> e355b03131dec9e3a6621ae5e89c1d7c90d2b3e6
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
