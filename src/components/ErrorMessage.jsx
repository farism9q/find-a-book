const ErrorMessage = ({ errorMsg = "Something went wrong", emj = "⛔" }) => {
  return (
    <h2 className="text-red-500">
      {errorMsg.toUpperCase()} <span>{emj} </span>
    </h2>
  );
};

export default ErrorMessage;
