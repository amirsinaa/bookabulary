const Features = ({ data }) => {
  return (
    <div className="relative grid gap-8 p-7 lg:grid-cols-2">
      {data.map(feature => {
        return (
          <div
            key={feature.id}
            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-lime-500 focus-visible:ring-opacity-50"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
            ><svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ><rect
              width="48"
              height="48"
              rx="8"
              fill="#d9f99d"
            ></rect>{feature.icon}</svg>
            </div>
            <div className="ml-4">
              <p
                className="text-lg font-medium dark:text-white text-gray-900">
                {feature.title}
              </p>
              <p className="text-md text-gray-500 dark:text-gray-100">{feature.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Features;