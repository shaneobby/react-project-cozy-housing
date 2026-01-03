import './App.css'
import propertyInfo from './properties.json'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './footer'
import Home from './pages/home'
import ExpandedProperty from './pages/ExpandedProperty'


function App() {
 return (
    <>
      <BrowserRouter>
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
     </BrowserRouter>
     <Footer />
    </>
  );
}

export default App
