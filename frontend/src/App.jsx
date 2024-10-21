import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import Settings from './components/Settings';
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector((state) => state.auth.userData);

  return (
    <div>
      <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/' element={user ? <Home /> : <Navigate to={'/signup'} />} />
          <Route path='/login' element={user ? <Navigate to={'/'} />:<Login />} />
          <Route path='/signup' element={user ? <Navigate to={'/'} /> : <Signup />} />
          <Route path='/settings' element={user ? <Settings /> : <Navigate to={'/login'} /> } />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App;
