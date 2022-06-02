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
import FormUrl from './components/FormUrl';
import FillForm from './components/FillForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
   
      <Routes>
      <Route exact path='/' element={<Login/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>
      <Route exact path='/userdashboard' element={<Userdashboard/>}></Route>
      <Route exact path='/Formurl/:id' element={<FormUrl/>}></Route>
      <Route exact path='/fillform/:id' element={<FillForm/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
