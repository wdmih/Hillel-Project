import slugify from '../utils/slugify';

class Movies {
  constructor() {
    this.movies = [];
    this.loaded = false;
  }
  getMovies() {
    return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=5456d15967dc5b822bdb44dd48469cfe', { method: 'GET' })
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        return response.json();
      })
      .then(data => {
        let now = Date.now(); // some kind of cache
        if (this.loaded === false || (now - this.loaded) > 60000) {
          data.results.forEach(item => {
            for (const key in item) {
              if (key === 'poster_path' || key === 'backdrop_path') {
                item[key] = 'https://image.tmdb.org/t/p/w500' + item[key];
              }
            }
          });
          this.movies = data.results;
          this.loaded = Date.now();
        }
      });
  }
  getMovieById(id) {
    return this.movies.find(item => item.id === id);
  }
  getMovieBySlug(slug) {
    return this.movies.find(item => slugify(item.title) === slug);
  }
  addMovie(movie) {
    this.movies.push(movie);
  }
}
let movies = new Movies();

export default movies;
