import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/header'
import CarChart from './pages/chart/carChart'
import BankChart from './pages/chart/bankChart'
function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/carChart" element={<CarChart/>}/>
          <Route path="/bankChart" element={<BankChart/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
