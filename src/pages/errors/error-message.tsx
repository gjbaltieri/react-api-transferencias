export const errorMessage = (msg: string) => {
  return (
    <div className='h-full pb-4 w-full text-red-500 font-semibold'>
      <p>• {msg}</p>
    </div>
  );
};
