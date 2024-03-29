const Loader = () => {
  return (
    <div className="min-w-screen flex items-center justify-center p-5">
      <div className="flex animate-pulse space-x-2">
        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default Loader;
