function Spinner() {
  return (
    <div
      className="
        fixed
        top-0
        right-0
        bottom-0
        left-0
        bg-black
        bg-opacity-50
        z-50
        flex
        justify-center
        items-center
      "
    >
      <div
        className="
          w-16 
          h-16 
          border-8 
          border-solid 
          border-t-black 
          border-x-transparent 
          border-b-gray-500 
          rounded-full 
          animate-spin
        "
      ></div>
    </div>
  );
}

export default Spinner;
