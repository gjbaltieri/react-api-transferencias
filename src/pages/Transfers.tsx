import axios from 'axios';
import { FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/images/Logo';
import { AuthContext } from '../context/AuthContext';
import { convertCurrency } from '../helper/convert-currency';

interface SucessModel {
  created_At: string;
  id: string;
  value: string;
}

export default function Transfers() {
  const { setUser, user } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [value, setValue] = useState('');
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [sameUser, setSameUser] = useState(false);
  const [userNotFound, setUsernotFound] = useState(false);
  const [transferSucess, setTransferSucess] = useState<SucessModel>();
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const values = {
      username,
      value: Number(value),
    };
    try {
      const token = localStorage.getItem('token') as string;
      const { data } = await axios.post(
        'https://api-transferencias.onrender.com/transfer',
        {
          username: values.username,
          value: values.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransferSucess({
        created_At: data.created_At,
        id: data.id,
        value: data.value,
      });
      const newBalance = user.balance - Number(value);
      setUser({ username: user.username, balance: newBalance, token });
    } catch (error: any) {
      if (error?.response.data.error === 'Username not found.') {
        setUsernotFound(true);
        setSameUser(false);
      }
      if (
        error?.response.data.error ===
        'Invalid param: You cannot send to yourself.'
      ) {
        setSameUser(true);
      }
      if (
        error?.response.data.error ===
        'Invalid action: your balance is insufficient for this transaction.'
      ) {
        setInsufficientFunds(true);
        setUsernotFound(false);
        setSameUser(false);
      }
    }
  };
  return (
    <main>
      <Link to={'/'}>
        <div className='flex justify-center w-2/12 m-auto p-5'>
          <Logo />
        </div>
      </Link>
      <p className='flex flex-1 justify-center text-gray-500 items-center'>
        Seu saldo atual:{' '}
        <span className='text-green-500 pl-2 font-bold text-xl'>
          {convertCurrency(user.balance)}
        </span>
      </p>
      <form
        className='flex flex-1 flex-col w-1/3 m-auto shadow-2xl p-10 rounded-md'
        onSubmit={(e) => submitForm(e)}
      >
        <div className='flex flex-col items-start'>
          <label className='w-2/12 font-bold'>Para: </label>
          <input
            required
            type='text'
            placeholder='Usuário'
            className='p-2 border border-black rounded-md w-full'
            name='username'
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          {userNotFound ? (
            <p className='text-red-400 text-sm ml-2'>Usuário não encotrado!</p>
          ) : null}
          {sameUser ? (
            <p className='text-red-400 text-sm ml-2'>
              Você não pode enviar para você mesmo!
            </p>
          ) : null}
        </div>

        <div className='flex flex-col items-start'>
          <label className='mt-4 font-bold'>Valor: </label>
          <input
            required
            step={0.01}
            type='number'
            placeholder='Valor'
            className='p-2 border border-black rounded-md w-full '
            name='value'
            onChange={(e) => setValue(e.target.value)}
          ></input>
          {insufficientFunds ? (
            <p className='text-red-400 text-sm ml-2'>Saldo insuficiente!</p>
          ) : null}
        </div>
        <button
          type='submit'
          className='bg-green-400 h-10 rounded w-1/2 m-auto mt-12'
        >
          Enviar
        </button>
      </form>
      <div>
        {transferSucess ? (
          <div className='w-1/3 flex m-auto pt-10'>
            <span>
              <p className='text-green-400 block text-3xl'> Sucesso! </p>
              <p className='text-gray-600 block text-[12px] italic'>
                {' '}
                id: {transferSucess.id}
              </p>
              <p className='py-2'>
                A transferência para{' '}
                <span className='font-bold'>{username}</span> no valor de{' '}
                <span className='font-bold'>
                  {convertCurrency(Number(transferSucess.value))}
                </span>{' '}
                já foi concluída, você já pode realizar uma nova transferência.
              </p>
            </span>
          </div>
        ) : null}
      </div>
    </main>
  );
}
