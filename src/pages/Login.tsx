import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logo from '../components/images/Logo';
import { useState, FormEvent, useContext } from 'react';
import { errorMessage } from './errors/error-message';
import { AuthContext } from '../context/AuthContext';
import { loginHelper } from '../helper/login/login-helper';
import LoadingSpinner from '../components/Loading-spinner';

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorStatus400, setErrorStatus400] = useState(false);
  const navigate = useNavigate();
  const submitForm = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await loginHelper(username, password);
      if (login) {
        setUser({
          username: login.username,
          balance: login.balance,
          token: login.token,
        });
        return navigate('/');
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response.status === 400) {
        setErrorStatus400(true);
      }
    }
    setLoading(false);
  };
  return (
    <main className='flex items-center flex-col justify-center h-full w-full pt-5'>
      <div className='w-48'>
        <Link to={'/'}>
          <Logo />
        </Link>
      </div>
      <div className='rounded-md w-48 shadow-xl  bg-white lg:w-3/6 md:w-5/6 sm:w-5/6'>
        <form
          className='flex justify-center flex-col p-10 w-full'
          onSubmit={(e) => submitForm(e)}
        >
          <input
            required
            type='text'
            placeholder='Usuário'
            className='p-4 mt-2 border border-black rounded-md my-5'
            name='username'
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <input
            required
            type='password'
            placeholder='Senha'
            className=' p-4 border border-black rounded-md  my-5'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {errorStatus400 ? errorMessage('Usuário ou senha inválidos') : null}
          <button
            type='submit'
            className='p-4
            my-5
            bg-blue-600 
            rounded-md 
            font-semibold 
            text-white 
            text-2xl 
            hover:cursor-pointer
          hover:bg-blue-700
            transition
            duration-150'
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className='flex flex-1 justify-center flex-col items-center border-t-2 pt-8'>
            <span className='p-2'>Não possui conta?</span>
            <Link
              to={'/cadastrar'}
              type='submit'
              className='p-4 bg-green-600 rounded-md font-semibold text-white text-2xl w-1/2 text-center hover:cursor-pointer'
            >
              {' '}
              Cadastre-se{' '}
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
