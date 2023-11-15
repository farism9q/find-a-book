const BookList = ({ book, onSelectedBook }) => {
  return (
    <li
      onClick={e => onSelectedBook(book)}
      className="flex justify-start items-center hover:bg-gray-500 cursor-pointer px-6 py-2 font-blackops text-amber-400 border-2 rounded-md m-1"
    >
      <img
        className="w-10 h-20"
        src={book.volumeInfo.imageLinks?.thumbnail}
        alt=""
      />
      <div className="flex flex-col ml-2 space-y-2">
        <h4>
          {book.volumeInfo.title}{" "}
          <span className="text-orange-500">
            ({book.volumeInfo.pageCount} page)
          </span>{" "}
        </h4>
        <p className="font-sans">
          {book.volumeInfo.authors?.join(", ")}
          {" - "}
          <span className="text-sm">{book.volumeInfo.publishedDate}</span>{" "}
        </p>
      </div>
    </li>
  );
};

export default BookList;
