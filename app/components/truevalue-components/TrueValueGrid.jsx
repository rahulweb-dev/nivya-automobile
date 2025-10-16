export default function TrueValueGrid({ cars }) {
  return (
    <div className='grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {cars.map((car) => (
        <div
          key={car.id}
          className='overflow-hidden transition bg-white border rounded-lg shadow-sm hover:shadow-md'
        >
          <img
            src={car.image}
            alt={car.name}
            className='object-cover w-full h-48'
          />
          <div className='p-3'>
            <h3 className='text-sm font-semibold'>{car.name}</h3>
            <p className='text-sm text-gray-500'>
              ₹{car.price.toLocaleString()} • {car.kmDriven} km •{' '}
              {car.modelYear}
            </p>
            <p className='text-xs text-gray-400'>
              {car.company} | {car.fuelType} | {car.transmission}
            </p>
            <button className='w-full mt-2 text-sm text-white bg-blue-600 rounded-md py-1.5'>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
