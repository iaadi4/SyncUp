import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.userData);
  const userData = user ? JSON.parse(user) : null;

  return (
    <div>
      <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={userData ? <Navigate to={'/'} /> : <Signup />} />
      </Routes>
    </div>
  )
}

export default App;
