const REACT_QUERY_DEFAULT_OPTIONS = {
  defaultOptions: {
    queries: {
      staleTime: 10 * (60 * 1000), // 5 mins
      cacheTime: 15 * (60 * 1000), // 10 mins
    },
  },
}

export const REACT_QUERY_VOCABULARY_TABLE_CACHE = {
  staleTime: 0,
  cacheTime: 0,
}

export default REACT_QUERY_DEFAULT_OPTIONS;