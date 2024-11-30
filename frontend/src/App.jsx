import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/header'
import CarChart from './pages/chart/carChart'
function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarChart/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
