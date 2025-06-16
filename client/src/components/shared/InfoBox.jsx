const InfoBox = ({ title, value, unit, icon }) => {
  return (
    <div className='mt-6 mx-auto flex flex-row min-w-75 justify-between bg-blue-light rounded-3xl px-7.5 py-3.75'>
      <div className='flex flex-col gap-1'>
        <h4 className="text-base text-text font-semibold leading-tight">
          {title}
        </h4>
        <span className='text-xl text-text font-bold'>{value} {unit}</span>
      </div>
      <div className='bg-white rounded-2xl w-16 h-16 flex items-center justify-center'>
        {icon}
      </div>
    </div>
  );
};

export default InfoBox;