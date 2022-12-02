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
import NotFound from '../pages/NotFound';

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
  const Logged = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return (
        <div className='flex flex-1 m-auto h-screen items-center justify-center'>
          <LoadingSpinner />;
        </div>
      );
    }
    if (authenticated) {
      return <Navigate to={'/'}></Navigate>;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />,
          <Route
            path='/login'
            element={
              <Logged>
                <Login />
              </Logged>
            }
          />
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
          <Route path='*' element={<NotFound />} />,
        </Routes>
      </AuthProvider>
    </Router>
  );
}

