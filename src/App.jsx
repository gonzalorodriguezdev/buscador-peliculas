import {useState, useEffect, useRef, useCallback} from "react";
import "./App.css";
import debounce from "just-debounce-it";

import {Movies} from "./components/Movies.jsx";
import {useMovies} from "./hooks/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";

      return;
    }

    if (search === "") {
      setError("No se puede buscar una pelicula vacia");

      return;
    }

    setError(null);
  }, [search]);

  return {search, updateSearch, error};
}

function App() {
  const [sort, setSort] = useState(false);
  const {search, updateSearch, error} = useSearch();
  const {movies, getMovies, loading} = useMovies({search, sort});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({search});
    }, 300),
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({search});
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;

    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            placeholder="Avengers, Star Wars, The Matrix..."
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            value={search}
            onChange={handleChange}
          />
          <input checked={sort} type="checkbox" onChange={handleSort} />
          <button>Buscar</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
