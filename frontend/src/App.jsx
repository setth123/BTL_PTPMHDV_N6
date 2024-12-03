import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/header'
import CarDisplay from './components/CarDisplay/CarDisplay'
function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarDisplay/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
