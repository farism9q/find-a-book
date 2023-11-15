const Box = ({ children, show, onToggleShow }) => {
  return (
    <div className="rounded-lg bg-gray-700 w-[30rem] max-w-[30rem] h-[80vh] max-h-[80vh] overflow-auto scrollbar-hide relative">
      <div className="flex items-end justify-end mr-2 text-4xl text-amber-500">
        <button className="z-10" onClick={e => onToggleShow()}>
          {show ? "-" : "+"}
        </button>
      </div>
      {children}
    </div>
  );
};

export default Box;
