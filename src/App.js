import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Routes,
  Route,


} from 'react-router-dom'
import Login from './components/Login';
import Userdashboard from './components/Userdashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
   
      <Routes>
      <Route exact path='/login' element={  <Login/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>

      <Route exact path='/userdashboard' element={<Userdashboard/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
