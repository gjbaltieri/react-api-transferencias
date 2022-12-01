import { Link } from 'react-router-dom';

export default function LoginButton() {
  return (
    <Link
      to='/login'
      className='border  px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-100'
    >
      {' '}
      Login{' '}
    </Link>
  );
}
