import axios from 'axios';
import { format } from 'date-fns';
import { useState, useEffect, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Logo from '../components/images/Logo';
import LoadingSpinner from '../components/Loading-spinner';
import { AuthContext } from '../context/AuthContext';
import { convertCurrency } from '../helper/convert-currency';

interface TransferModel {
  created_At: string;
  creditedAccountId: { username: string };
  debitedAccountId: { username: string };
  id: string;
  value: number;
}
const token = localStorage.getItem('token');
const baseURL = 'https://api-transferencias.onrender.com/my-transfers';

export default function Mytransfers() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [select, setSelect] = useState('');
  const [transfers, setTransfers] = useState<TransferModel[]>();
  let [searchDate, setSearchDate] = useState('');
  if (!searchDate) {
    searchDate = '1999-01-01';
  }
  useEffect(() => {
    let url = `${baseURL}/${select}`;
    if (select === '') {
      url = `https://api-transferencias.onrender.com/my-transfers`;
    }
    axios
      .post(
        url,
        { date: searchDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        setTransfers(data.data);
      });
  }, []);
  const click = async () => {
    let url = `${baseURL}/${select}`;
    if (select === '') {
      url = `https://api-transferencias.onrender.com/my-transfers`;
    }
    const { data } = await axios.post(
      url,
      { date: searchDate },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTransfers(data);
  };
  return (
    <div className='flex flex-col h-screen'>
      <Link to={'/'}>
        <div className='flex justify-center w-2/12 m-auto p-5'>
          <Logo />
        </div>
      </Link>
      <nav className='bg-gray-900 p-3 h-1/5'>
        <div className='flex justify-center p-3 gap-11'>
          <select
            className='rounded-lg px-5 py-2 transition-all duration-150'
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value={''}>Todas</option>
            <option value={'send'}>Enviadas</option>
            <option value={'received'}>Recebidas</option>
          </select>
          <input
            onChange={(e) => setSearchDate(e.target.value)}
            type='date'
            className='rounded-lg px-5 py-2'
            min={'2022-01-01'}
            max={today}
          ></input>
        </div>
        <div className='flex justify-center'>
          <button
            className='px-5 py-2 bg-white hover:bg-gray-200 transition-all duration-150'
            onClick={click}
          >
            Filtrar
          </button>
        </div>
      </nav>
      {transfers ? (
        <section>
          {transfers.length <= 0 ? (
            <h1 className='text-slate-700 text-3xl w-2/3 text-center m-auto pt-16 leading-relaxed'>
              Você não participou de nenhuma transferência nesse periodo, faça
              ou peça uma agora mesmo!
            </h1>
          ) : (
            <table className='w-full border-collapse border border-b-slate-500 md:table-fixed'>
              <thead className='bg-gray-800 text-gray-200 '>
                <tr>
                  <th className='py-4'>De</th>
                  <th className='py-4'>Para</th>
                  <th className='py-4'>Valor</th>
                  <th className='py-4'>Data</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr key={transfer.id}>
                    <th className='py-2 border-b border-slate-300'>
                      {transfer.debitedAccountId.username}
                    </th>
                    <th className='py-2 border-b border-b-slate-300'>
                      {transfer.creditedAccountId.username}
                    </th>
                    <th className='py-2 border-b border-b-slate-300'>
                      {convertCurrency(transfer.value)}
                    </th>
                    <th className='py-2 border-b border-b-slate-300'>
                      {format(
                        new Date(transfer.created_At),
                        'HH:mm - dd/MM/yyyy'
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
