function Spinner() {
  return (
    <div
      className="
        fixed
        top-0
        right-0
        bottom-0
        left-0
        z-50
        flex
        items-center
        justify-center
        bg-black
        bg-opacity-50
      "
    >
      <div
        className="
          h-16 
          w-16 
          animate-spin 
          rounded-full 
          border-8 
          border-solid 
          border-x-transparent 
          border-t-black 
          border-b-gray-500
        "
      ></div>
    </div>
  );
}

export default Spinner;
