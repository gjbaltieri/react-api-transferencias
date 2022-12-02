import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { convertCurrency } from '../helper/convert-currency';
import Logo from './images/Logo';
import Logged from './Login/logged-menu';
import LoginButton from './Login/LoginButton';

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <header className='flex flex-1  justify-between items-center w-full h-auto p-2 bg-white border border-b-gray-700'>
      <a className='flex justify-center cursor-pointer h-10' href='/'>
        <Logo />
      </a>
      {user ? (
        <div className='flex items-center'>
          <span>
            Saldo:{' '}
            <span className='text-green-500 font-bold'>
              {convertCurrency(user.balance)}
            </span>
          </span>

          <Logged username={user.username} />
        </div>
      ) : (
        <div className='flex gap-8 items-center'>
          <Link to={'/cadastrar'}>
            <p className='text-lg hover:text-gray-500'> cadastrar </p>
          </Link>
          <LoginButton />
        </div>
      )}
    </header>
  );
}
