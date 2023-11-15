import Button from "./Button";

const BookDetails = ({ selectedBook, isSaved, onClickBookmark }) => {
  return (
    <div className="grid grid-rows-[3fr_4fr] absolute h-full top-0 text-amber-200 w-full">
      <div className="grid grid-cols-[1fr_2fr] h-fit items-center justify-start bg-slate-600">
        <img
          className="h-full"
          src={selectedBook.volumeInfo.imageLinks?.thumbnail}
          alt=""
        />
        <div className="ml-3  py-6">
          <h4 className="mb-2 font-blackops text-2xl">
            {selectedBook.volumeInfo.title}
          </h4>
          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <p>
                {" "}
                <span className="text-orange-200 font-semibold">
                  PUBLISHED BY:{" "}
                </span>
                {selectedBook.volumeInfo.publisher || "Not found"}{" "}
              </p>
              <p>
                {" "}
                <span className="text-orange-200 font-semibold">
                  CATEGORY:{" "}
                </span>
                {selectedBook.volumeInfo.categories || "Not found"}{" "}
              </p>
            </div>
            <div>
              {isSaved ? (
                <Button
                  text={"Remove from collection"}
                  bgColor="bg-black"
                  textColor="text-orange-400"
                  onClick={() => onClickBookmark(selectedBook)}
                />
              ) : (
                <Button
                  text={"Add to collection"}
                  onClick={() => onClickBookmark(selectedBook)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-96 m-auto text-[16px] my-3 space-y-3">
        {selectedBook.volumeInfo.averageRating && (
          <div className="text-xs flex items-center justify-around">
            <p className="text-orange-200 font-semibold uppercase">
              average rating: {selectedBook.volumeInfo.averageRating}
              <span>⭐</span>
            </p>
            <p className="text-orange-200 font-semibold uppercase">
              Number of ratings: {selectedBook.volumeInfo.ratingsCount}
            </p>
          </div>
        )}
        <div className=" bg-gray-600 overflow-auto scrollbar-hide p-2 rounded-lg h-72">
          <p>
            {selectedBook.volumeInfo.description || "There is no description"}
          </p>
        </div>
        {selectedBook.saleInfo.saleability === "FOR_SALE" && (
          <>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-2xl flex justify-center"
              href={selectedBook.saleInfo.buyLink}
            >
              {`Buy it for ${
                selectedBook.saleInfo.listPrice.amount +
                " " +
                selectedBook.saleInfo.listPrice.currencyCode
              }`}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
