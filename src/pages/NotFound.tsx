import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className='flex justify-center items-center h-screen bg-red-100 flex-col'>
      <h1 className='text-orange-500 text-9xl font-bold p-9'>
        4<span className='text-yellow-600'>&#60;/&#62;</span>4
      </h1>
      <p className='text-gray-600 text-3xl'>Page not found.</p>
      <Link to={'/'} className='hover:cursor-pointer my-9 text-gray-600'>
        {' '}
        Voltar{' '}
      </Link>
    </main>
  );
}
