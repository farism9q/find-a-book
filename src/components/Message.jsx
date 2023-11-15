const Message = ({ children }) => {
  return (
    <div className="flex flex-col h-full justify-center items-center font-blackops text-3xl">
      {children}
    </div>
  );
};

export default Message;
