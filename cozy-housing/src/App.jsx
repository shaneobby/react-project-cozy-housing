import './App.css'
import propertyInfo from './properties.json'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import Home from './pages/home'
import ExpandedProperty from './pages/ExpandedProperty'


function App() {
  return (
    <BrowserRouter basename="/react-project-cozy-housing/">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home propertyInfo={propertyInfo.properties} />}
        />
        <Route
          path="/property/:id"
          element={<ExpandedProperty propertyInfo={propertyInfo.properties} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
