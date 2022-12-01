import { Link, redirect, useNavigate } from 'react-router-dom';
import Logo from '../components/images/Logo';
import { FormEvent, useContext, useState } from 'react';
import axios from 'axios';
import { errorMessage } from './errors/error-message';
import { loginHelper } from '../helper/login/login-helper';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordLeastCaracteres, setPasswordLeastCaracteres] = useState(false);
  const [error409, setError409] = useState(false);
  const [userLeastCaracteres, setUserLeastCaracteres] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const submitForm = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://api-transferencias.onrender.com/signup', {
        username,
        password,
      });
      const login = await loginHelper(username, password);
      setUser({
        username: login.username,
        balance: login.balance,
        token: login.token,
      });
      navigate('/');
    } catch (error: any) {
      if (
        error?.response.data.error ===
        'Invalid param: Username must contain at least 3 characters.'
      ) {
        setPasswordLeastCaracteres(false);
        setError409(false);
        setUserLeastCaracteres(true);
      }
      if (
        error?.response.data.error ===
        'Invalid param: The password must contain at least 8 characters, at least one uppercase and one number.'
      ) {
        setUserLeastCaracteres(false);
        setPasswordLeastCaracteres(true);
      }
      if (error?.response.status === 409) {
        setUserLeastCaracteres(false);
        setPasswordLeastCaracteres(false);
        setError409(true);
      }
    }
    setLoading(false);
  };

  return (
    <main className='flex flex-col items-center justify-center h-full w-full pt-5'>
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
            type='text'
            placeholder='Usuário'
            className='p-4 mt-2 border border-black rounded-md my-5'
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <span>
            {error409 ? errorMessage('Usuário já cadastrado.') : null}
          </span>
          <span>
            {userLeastCaracteres
              ? errorMessage(
                  'O nome de usuário deve contém ao menos 3 caracteres'
                )
              : null}
          </span>

          <input
            type='password'
            placeholder='Senha'
            className=' p-4 border border-black rounded-md  my-5'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span>
            {passwordLeastCaracteres
              ? errorMessage(
                  'A senha deve contém ao menos 8 caracteres, 1 maiúscula e um número.'
                )
              : null}
          </span>

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
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <div className='flex flex-1 justify-center flex-col items-center border-t-2 pt-8 '>
            <span className=''>Já possui conta?</span>
            <Link
              to={'/login'}
              type='submit'
              className='p-4 bg-green-600 
              rounded-md 
              font-semibold 
              text-white 
              text-2xl 
              w-1/2 
              text-center 
              hover:cursor-pointer 
              hover:bg-green-700
              transition
              duration-150'
            >
              {' '}
              Login{' '}
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
