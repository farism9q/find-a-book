import { useEffect, useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import SearchResult from "./SearchResult";
import Box from "./Box";
import Books from "./Books";
import BookList from "./BookList";
import { useToggle } from "../custom-hooks/useShowObject";
import BookDetails from "./BookDetails";
import { useFetch } from "../custom-hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Message from "./Message";
import LoadingMessage from "./Loading";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";
import Header from "./Header";
import Button from "./Button";
import { useKey } from "../custom-hooks/useKey";

const dummyBooks = [
  {
    kind: "books#volume",
    id: "AZ5J6B1-4BoC",
    etag: "kIzQA7IUObk",
    selfLink: "https://www.googleapis.com/books/v1/volumes/AZ5J6B1-4BoC",
    volumeInfo: {
      title: "The Girl Who Kicked the Hornet's Nest",
      authors: ["Stieg Larsson"],
      publisher: "Knopf",
      publishedDate: "2010-05-25",
    },
  },

  {
    kind: "books#volume",
    id: "UvK1Slvkz3MC",
    etag: "otKmdbRgdFQ",
    selfLink: "https://www.googleapis.com/books/v1/volumes/UvK1Slvkz3MC",
    volumeInfo: {
      title: "The Girl who Played with Fire",
      authors: ["Stieg Larsson"],
      publisher: "Knopf",
      publishedDate: "2009-07-28",
    },
  },
  {
    kind: "books#volume",
    id: "OBM3AAAAIAAJ",
    etag: "xb47kTr8HsQ",
    selfLink: "https://www.googleapis.com/books/v1/volumes/OBM3AAAAIAAJ",
    volumeInfo: {
      title: "The Sign of Four",
      authors: ["Sir Arthur Conan Doyle"],
      publishedDate: "1890",
    },
  },
];
const nbBooks = 10;
function App() {
  const [showBooks, handleToggleBooksShow] = useToggle(true);
  const [showBox2, handleToggleShowBox2] = useToggle(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [books, error, isLoading] = useFetch(`${query}&startIndex=${page}`);
  const [savedBooks, setSavedBooks] = useLocalStorage("books");

  const isSaved = savedBooks.find(sBook => sBook.id === selectedBook?.id);

  useEffect(() => {
    if (!selectedBook) return;
    document.title = selectedBook.volumeInfo.title;

    return function () {
      document.title = "Find a book";
    };
  }, [selectedBook]);

  function handleOnSelectBook(book) {
    setSelectedBook(book);
  }

  function handleCloseBookDetails() {
    setSelectedBook(null);
  }

  function handleCloseBooksAndDetails() {
    setQuery("");
    setPage(0);
    handleCloseBookDetails();
  }

  function handleClickBookmark(book) {
    setSavedBooks(b =>
      isSaved ? b.filter(bb => bb.id !== book.id) : [book, ...b]
    );
  }

  function handleNextPage() {
    setPage(e => e + nbBooks);
    handleCloseBookDetails();
  }
  function handlePrevousPage() {
    if (page === 0) return;
    setPage(e => e - nbBooks);
    handleCloseBookDetails();
  }

  return (
    <div className="bg-gray-800 h-screen p-2">
      <nav className="flex justify-between items-center rounded-lg bg-amber-600 px-8 py-4">
        <Logo />

        <Search
          query={query}
          setQuery={setQuery}
          onCloseBooksAndDetails={handleCloseBooksAndDetails}
        />

        <SearchResult
          display={books?.items && true}
          currPage={page ? page / nbBooks + 1 : 1}
        />
      </nav>
      <main className="flex justify-center items-center w-full my-8 space-x-4">
        <Box show={showBooks} onToggleShow={handleToggleBooksShow}>
          {isLoading && (
            <Message>
              {" "}
              <LoadingMessage />{" "}
            </Message>
          )}
          {showBooks && !isLoading && books?.items && (
            <>
              <Books key={page}>
                {books?.items?.map(book => (
                  <BookList
                    book={book}
                    key={book.id}
                    onSelectedBook={handleOnSelectBook}
                  />
                ))}

                <div className="flex justify-between items-center m-2">
                  <Button onClick={() => handlePrevousPage()} text={"BACK"} />
                  <Button onClick={() => handleNextPage()} text={"NEXT"} />
                </div>
              </Books>
            </>
          )}
          {error.length !== 0 && (
            <Message>
              <ErrorMessage errorMsg={error} />
            </Message>
          )}
        </Box>

        <Box show={showBox2} onToggleShow={handleToggleShowBox2}>
          {selectedBook && (
            <button
              onClick={e => handleCloseBookDetails()}
              className="absolute z-10 top-2 text-2xl bg-orange-300 p-1 rounded-full ml-2"
            >
              🔙
            </button>
          )}
          {selectedBook && showBox2 && (
            <BookDetails
              key={selectedBook.id}
              selectedBook={selectedBook}
              isSaved={isSaved}
              onClickBookmark={handleClickBookmark}
            />
          )}
          {!selectedBook && showBox2 && (
            <>
              {savedBooks.length ? (
                <>
                  <Header header={"Saved collections"} />

                  {savedBooks.map(book => (
                    <BookList
                      book={book}
                      key={book.id}
                      onSelectedBook={handleOnSelectBook}
                    />
                  ))}
                </>
              ) : (
                <Message>
                  <h1 className="text-orange-400">EMPTY COLLECTION</h1>
                </Message>
              )}
            </>
          )}
        </Box>
      </main>
    </div>
  );
}

export default App;
