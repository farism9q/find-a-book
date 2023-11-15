const SearchResult = ({ currPage, display = true }) => {
  return <h3 className="text-2xl">{display && `Current page: ${currPage}`}</h3>;
};

export default SearchResult;
