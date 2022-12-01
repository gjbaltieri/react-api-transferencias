import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyTransfers from '../pages/my-transfers';
import Signup from '../pages/Signup';

import { AuthContext, AuthProvider } from '../context/AuthContext';
import { useContext } from 'react';
import Transfers from '../pages/Transfers';
import LoadingSpinner from '../components/Loading-spinner';

export default function AppRoutes() {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return (
        <div className='flex flex-1 m-auto h-screen items-center justify-center'>
          <LoadingSpinner />;
        </div>
      );
    }
    if (!authenticated) {
      return <Navigate to={'/login'}></Navigate>;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />,
          <Route path='/login' element={<Login />} />
          ,
          <Route path='/cadastrar' element={<Signup />} />,
          <Route
            path='/transferir'
            element={
              <Private>
                <Transfers />
              </Private>
            }
          />
          ,
          <Route
            path='/transferencias'
            element={
              <Private>
                <MyTransfers />
              </Private>
            }
          />
          ,
        </Routes>
      </AuthProvider>
    </Router>
  );
}
