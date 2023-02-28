export const ListOfMovies = ({movies}) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li key={movie.id} className="movie">
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img alt={movie.title} src={movie.poster} />
        </li>
      ))}
    </ul>
  );
};

export const NoMoviesResults = () => {
  return <p>No se encontraron resultados</p>;
};

export const Movies = ({movies}) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
};
