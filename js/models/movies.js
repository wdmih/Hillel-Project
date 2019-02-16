export class Movies {
  constructor(movies) {
    this.movies = movies;
  }
  getMovies() {
    return this.movies;
  }
  getMovieById(id) {
    return this.movies.find(item => item.id === id);
  }
  addMovie(movie) {
    this.movies.push(movie);
  }
}
