const Button = ({
  text,
  bgColor = "bg-orange-400",
  textColor = "text-black",
  onClick,
}) => {
  const btnStyle = `text-center py-1 px-3 rounded-lg w-fit h-8 ${bgColor} ${textColor}`;

  return (
    <button onClick={e => onClick()} className={btnStyle}>
      {text}
    </button>
  );
};

export default Button;
