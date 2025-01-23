const FullPageLoader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-white bg-opacity-70">
      <div className="size-20 animate-ping bg-primary fixed rounded-full"></div>
      <div className="size-16 animate-ping delay-150 bg-yellow-400 fixed rounded-full"></div>
      <div className="size-14 animate-ping delay-200 bg-yellow-400 fixed rounded-full"></div>
    </div>
  );
};

export default FullPageLoader;
