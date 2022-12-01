import MainImage from './images/MainImage';

export default function Main() {
  return (
    <div className='flex h-full justify-center bg-red-200 items-center p-32 lg:flex-row md:flex-col sm:flex-col'>
      <div className='flex flex-1 min-w-50 justify-center'>
        <h1 className='text-6xl text-center leading-relaxed md:text-center'>
          Realize transferencias de forma{' '}
          <span className='font-bold'>rápida</span> e{' '}
          <span className='font-bold'>fácil</span>.
        </h1>
      </div>
      <div className='flex flex-1 justify-center'>
        <MainImage />
      </div>
    </div>
  );
}
