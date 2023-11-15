import { useEffect, useState } from "react";
import { GOOGLE_BOOK_API } from ".././config";

export function useFetch(query) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const APIKEY = GOOGLE_BOOK_API;

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setError("");
        setIsLoading(true);

        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&key=${APIKEY}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching books");
        }

        const data = await res.json();

        if (data.totalItems === 0) setError("No books were found");

        setData(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.split("&")[0].length < 3) {
      setData([]);
      setError("");
      return;
    }
    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return [data, error, isLoading];
}
