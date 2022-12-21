import './App.css';
import {Routes, Route} from 'react-router-dom';
import AskQuestions from './Pages/AskQuestions';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Post from './Pages/Post';
import ProfileDefault from './Pages/ProfileDefault';
import ProfileEdit from './Pages/ProfileEdit';
import ProfileDelete from './Pages/ProfileDelete';
import Signup from './Pages/Signup';
import Tags from './Pages/Tags';
import Users from './Pages/Users';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/post'>
        <Route path=':id' element={<Post/>}></Route>       
      </Route>
      <Route path='/askquestions' element={<AskQuestions/>}></Route>
      <Route path='/tags' element={<Tags/>}></Route>
      <Route path='/users' element={<Users/>}></Route>
      <Route path='/profile/:id'>
        <Route index element={<ProfileDefault/>}></Route>
        <Route path='edit' element={<ProfileEdit/>}></Route>
        <Route path='delete' element={<ProfileDelete/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
