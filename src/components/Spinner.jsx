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
      <img
        className="animate-[spin_2s_linear_infinite]"
        src="/puntti-emblem.svg"
        alt="spinnerLogo"
        width={128}
        height={128}
      />
    </div>
  );
}

export default Spinner;
