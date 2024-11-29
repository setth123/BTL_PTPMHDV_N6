import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/header'
import CarCompare from './pages/CarCompare'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarCompare/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
