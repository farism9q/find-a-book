const LoadingMessage = ({ msg = "Loading...", emj = "" }) => {
  return (
    <h2 className="text-slate-400">
      {msg} <span>{emj}</span>
    </h2>
  );
};

export default LoadingMessage;
