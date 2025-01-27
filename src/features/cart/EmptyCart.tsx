const EmptyCart = () => {
  return (
    <div className="w-full h-full space-y-6 text-center flex flex-col grow flex-1 justify-center items-center">
      <div className="space-y-8">
        <div className="text-6xl text-center">🍕</div>
        <h1 className="text-4xl font-bold font-display tracking-tighter sm:text-5xl">
          <span>Cart is empty. </span>
        </h1>
      </div>
    </div>
  );
};

export default EmptyCart;
