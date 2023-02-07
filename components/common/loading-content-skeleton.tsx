export const LoadingContentSkeleton = ({ format }) => {
  return (
    <>
      {[...Array(format)].map((item, key) => {
        return (
          <div key={key} className="flex flex-col justify-center w-full p-4 m-2 bg-white rounded-lg md:p-10 md:w-5/12 min-h-24 drop-shadow-md grow">
            <div className="flex space-x-4 animate-pulse">
              <div className="flex-1 py-1 space-y-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="h-2 col-span-4 bg-gray-500 rounded"></div> <span className="h-2 col-span-1 rounded bg-lime-700"></span>
                  </div>

                  <div className="h-2 mt-2 bg-gray-300 rounded"></div>
                  <div className="h-2 mt-2 bg-gray-300 rounded"></div>
                  <div className="h-2 mt-2 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}