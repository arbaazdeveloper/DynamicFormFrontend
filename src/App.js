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
import Responses from './components/userfeatures/Responses';
import Thanks from './components/Thanks';
import Responselist from './components/Responselist';
import EditForm from './components/userfeatures/EditForm';
import Visulization from './components/userfeatures/Visulization';
import Edit from './components/userfeatures/Edit';
import Updated from './Updated';
import Navbar from './components/userfeatures/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
   <Navbar />
      <Routes>
      <Route exact path='/' element={<Login/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>
      <Route exact path='/userdashboard' element={<Userdashboard/>}></Route>
      <Route exact path='/Formurl/:id' element={<FormUrl/>}></Route>
      <Route exact path='/fillform/:id' element={<FillForm/>}></Route>
      <Route exact path='/response/:id' element={<Responses/>}></Route>
      <Route exact path='/thanks' element={<Thanks/>}></Route>
      <Route exact path='/responselist' element={<Responselist/>}/>
      <Route exact path='editform/:id' element={<Edit/>}/>
      <Route exact path='/visualize' element={<Visulization/>}></Route>
      <Route exact path='/updated' element={<Updated/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
